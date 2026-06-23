import { supabase } from "./supabaseClient";

const FILTER_OPS = {
  $gte: "gte",
  $lte: "lte",
  $gt: "gt",
  $lt: "lt",
  $ne: "neq",
  $in: "in",
};

function applySort(query, sort) {
  if (!sort) return query;
  const desc = sort.startsWith("-");
  const field = desc ? sort.slice(1) : sort;
  return query.order(field, { ascending: !desc });
}

function applyQuery(query, filters) {
  for (const [field, value] of Object.entries(filters || {})) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      for (const [op, opValue] of Object.entries(value)) {
        const method = FILTER_OPS[op];
        if (!method) throw new Error(`Operador de filtro desconhecido: ${op}`);
        query = query[method](field, opValue);
      }
    } else {
      query = query.eq(field, value);
    }
  }
  return query;
}

// Cria um cliente de entidade com a mesma forma do SDK base44
// (list/filter/create/update/delete/bulkCreate/subscribe), mas sobre o Supabase.
function createEntityClient(table) {
  return {
    async list(sort = "-created_date", limit = 50, skip = 0) {
      let query = supabase.from(table).select("*");
      query = applySort(query, sort);
      query = query.range(skip, skip + Math.min(limit, 500) - 1);
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },

    async filter(filters = {}, sort = "-created_date", limit = 100) {
      let query = supabase.from(table).select("*");
      query = applyQuery(query, filters);
      query = applySort(query, sort);
      query = query.limit(Math.min(limit, 500));
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },

    async get(id) {
      const { data, error } = await supabase.from(table).select("*").eq("id", id).single();
      if (error) throw error;
      return data;
    },

    async create(fields) {
      const { data, error } = await supabase.from(table).insert(fields).select().single();
      if (error) throw error;
      return data;
    },

    async bulkCreate(items) {
      const { data, error } = await supabase.from(table).insert(items).select();
      if (error) throw error;
      return data;
    },

    async update(id, fields) {
      const { id: _omit, created_by_id, created_date, ...safeFields } = fields || {};
      const { data, error } = await supabase
        .from(table)
        .update(safeFields)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },

    async delete(id) {
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) throw error;
    },

    // Subscrição em tempo real (substitui o WebSocket do base44 por postgres_changes).
    subscribe(callback) {
      const channel = supabase
        .channel(`realtime:${table}`)
        .on("postgres_changes", { event: "*", schema: "public", table }, (payload) => {
          if (payload.eventType === "INSERT") {
            callback({ type: "create", id: payload.new.id, data: payload.new });
          } else if (payload.eventType === "UPDATE") {
            callback({ type: "update", id: payload.new.id, data: payload.new });
          } else if (payload.eventType === "DELETE") {
            callback({ type: "delete", id: payload.old.id, data: null });
          }
        })
        .subscribe();
      return () => supabase.removeChannel(channel);
    },
  };
}

export const Task = createEntityClient("tasks");
export const Tag = createEntityClient("tags");
export const FocusSession = createEntityClient("focus_sessions");
export const Habit = createEntityClient("habits");
export const HabitEntry = createEntityClient("habit_entries");
export const Deadline = createEntityClient("deadlines");
export const Event = createEntityClient("events");
export const MeetingRecording = createEntityClient("meeting_recordings");
