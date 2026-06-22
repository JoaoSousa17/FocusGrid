import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/lib/PageNotFound.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=fc940917"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import * as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/lib/PageNotFound.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import { useLocation } from "/node_modules/.vite/deps/react-router-dom.js?v=8a08d97a";
import { base44 } from "/src/api/base44Client.js";
import { useQuery } from "/node_modules/.vite/deps/@tanstack_react-query.js?v=460512f4";
export default function PageNotFound({ "data-collection-item-id": __dataCollectionItemId }) {
  _s();
  const location = useLocation();
  const pageName = location.pathname.substring(1);
  const { data: authData, isFetched } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const user = await base44.auth.me();
        return { user, isAuthenticated: true };
      } catch (error) {
        return { user: null, isAuthenticated: false };
      }
    }
  });
  return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "PageNotFound:23:8", "data-dynamic-content": "true", className: "min-h-screen flex items-center justify-center p-6 bg-slate-50", "data-collection-item-id": __dataCollectionItemId, children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "PageNotFound:24:12", "data-dynamic-content": "true", className: "max-w-md w-full", children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "PageNotFound:25:16", "data-dynamic-content": "true", className: "text-center space-y-6", children: [
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "PageNotFound:27:20", "data-dynamic-content": "false", className: "space-y-2", children: [
      /* @__PURE__ */ jsxDEV("h1", { "data-source-location": "PageNotFound:28:24", "data-dynamic-content": "false", className: "text-7xl font-light text-slate-300", children: "404" }, void 0, false, {
        fileName: "/app/src/lib/PageNotFound.jsx",
        lineNumber: 47,
        columnNumber: 25
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "PageNotFound:29:24", "data-dynamic-content": "false", className: "h-0.5 w-16 bg-slate-200 mx-auto" }, void 0, false, {
        fileName: "/app/src/lib/PageNotFound.jsx",
        lineNumber: 48,
        columnNumber: 25
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/lib/PageNotFound.jsx",
      lineNumber: 46,
      columnNumber: 21
    }, this),
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "PageNotFound:33:20", "data-dynamic-content": "true", className: "space-y-3", children: [
      /* @__PURE__ */ jsxDEV("h2", { "data-source-location": "PageNotFound:34:24", "data-dynamic-content": "false", className: "text-2xl font-medium text-slate-800", children: "Page Not Found" }, void 0, false, {
        fileName: "/app/src/lib/PageNotFound.jsx",
        lineNumber: 53,
        columnNumber: 25
      }, this),
      /* @__PURE__ */ jsxDEV("p", { "data-source-location": "PageNotFound:37:24", "data-dynamic-content": "true", className: "text-slate-600 leading-relaxed", children: [
        "The page ",
        /* @__PURE__ */ jsxDEV("span", { "data-source-location": "PageNotFound:38:37", "data-dynamic-content": "true", className: "font-medium text-slate-700", "data-collection-item-field": "pageName", "data-collection-item-id": __dataCollectionItemId, children: [
          '"',
          pageName,
          '"'
        ] }, void 0, true, {
          fileName: "/app/src/lib/PageNotFound.jsx",
          lineNumber: 57,
          columnNumber: 38
        }, this),
        " could not be found in this application."
      ] }, void 0, true, {
        fileName: "/app/src/lib/PageNotFound.jsx",
        lineNumber: 56,
        columnNumber: 25
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/lib/PageNotFound.jsx",
      lineNumber: 52,
      columnNumber: 21
    }, this),
    isFetched && authData.isAuthenticated && authData.user?.role === "admin" && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "PageNotFound:44:24", "data-dynamic-content": "false", className: "mt-8 p-4 bg-slate-100 rounded-lg border border-slate-200", children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "PageNotFound:45:28", "data-dynamic-content": "false", className: "flex items-start space-x-3", children: [
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "PageNotFound:46:32", "data-dynamic-content": "false", className: "flex-shrink-0 w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center mt-0.5", children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "PageNotFound:47:36", "data-dynamic-content": "false", className: "w-2 h-2 rounded-full bg-orange-400" }, void 0, false, {
        fileName: "/app/src/lib/PageNotFound.jsx",
        lineNumber: 66,
        columnNumber: 37
      }, this) }, void 0, false, {
        fileName: "/app/src/lib/PageNotFound.jsx",
        lineNumber: 65,
        columnNumber: 33
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "PageNotFound:49:32", "data-dynamic-content": "false", className: "text-left space-y-1", children: [
        /* @__PURE__ */ jsxDEV("p", { "data-source-location": "PageNotFound:50:36", "data-dynamic-content": "false", className: "text-sm font-medium text-slate-700", children: "Admin Note" }, void 0, false, {
          fileName: "/app/src/lib/PageNotFound.jsx",
          lineNumber: 69,
          columnNumber: 37
        }, this),
        /* @__PURE__ */ jsxDEV("p", { "data-source-location": "PageNotFound:51:36", "data-dynamic-content": "false", className: "text-sm text-slate-600 leading-relaxed", children: "This could mean that the AI hasn't implemented this page yet. Ask it to implement it in the chat." }, void 0, false, {
          fileName: "/app/src/lib/PageNotFound.jsx",
          lineNumber: 70,
          columnNumber: 37
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/lib/PageNotFound.jsx",
        lineNumber: 68,
        columnNumber: 33
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/lib/PageNotFound.jsx",
      lineNumber: 64,
      columnNumber: 29
    }, this) }, void 0, false, {
      fileName: "/app/src/lib/PageNotFound.jsx",
      lineNumber: 63,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "PageNotFound:60:20", "data-dynamic-content": "true", className: "pt-6", children: /* @__PURE__ */ jsxDEV(
      "button",
      {
        "data-source-location": "PageNotFound:61:24",
        "data-dynamic-content": "true",
        onClick: () => window.location.href = "/",
        className: "inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500",
        children: [
          /* @__PURE__ */ jsxDEV("svg", { "data-source-location": "PageNotFound:65:28", "data-dynamic-content": "false", className: "w-4 h-4 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxDEV("path", { "data-source-location": "PageNotFound:66:32", "data-dynamic-content": "false", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" }, void 0, false, {
            fileName: "/app/src/lib/PageNotFound.jsx",
            lineNumber: 85,
            columnNumber: 33
          }, this) }, void 0, false, {
            fileName: "/app/src/lib/PageNotFound.jsx",
            lineNumber: 84,
            columnNumber: 29
          }, this),
          "Go Home"
        ]
      },
      void 0,
      true,
      {
        fileName: "/app/src/lib/PageNotFound.jsx",
        lineNumber: 80,
        columnNumber: 25
      },
      this
    ) }, void 0, false, {
      fileName: "/app/src/lib/PageNotFound.jsx",
      lineNumber: 79,
      columnNumber: 21
    }, this)
  ] }, void 0, true, {
    fileName: "/app/src/lib/PageNotFound.jsx",
    lineNumber: 44,
    columnNumber: 17
  }, this) }, void 0, false, {
    fileName: "/app/src/lib/PageNotFound.jsx",
    lineNumber: 43,
    columnNumber: 13
  }, this) }, void 0, false, {
    fileName: "/app/src/lib/PageNotFound.jsx",
    lineNumber: 42,
    columnNumber: 5
  }, this);
}
_s(PageNotFound, "CdQhHkZI31BBysnji9DTEvRGLEE=", false, function() {
  return [useLocation, useQuery];
});
_c = PageNotFound;
var _c;
$RefreshReg$(_c, "PageNotFound");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/lib/PageNotFound.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/lib/PageNotFound.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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QUFvQjtBQUFBLGFBQUFBLElBQUEiLCJuYW1lcyI6WyJ1c2VMb2NhdGlvbiIsImJhc2U0NCIsInVzZVF1ZXJ5IiwiUGFnZU5vdEZvdW5kIiwiX19kYXRhQ29sbGVjdGlvbkl0ZW1JZCIsIl9zIiwibG9jYXRpb24iLCJwYWdlTmFtZSIsInBhdGhuYW1lIiwic3Vic3RyaW5nIiwiZGF0YSIsImF1dGhEYXRhIiwiaXNGZXRjaGVkIiwicXVlcnlLZXkiLCJxdWVyeUZuIiwidXNlciIsImF1dGgiLCJtZSIsImlzQXV0aGVudGljYXRlZCIsImVycm9yIiwicm9sZSIsIndpbmRvdyIsImhyZWYiLCJfYyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJQYWdlTm90Rm91bmQuanN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZUxvY2F0aW9uIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgeyBiYXNlNDQgfSBmcm9tICdAL2FwaS9iYXNlNDRDbGllbnQnO1xuaW1wb3J0IHsgdXNlUXVlcnkgfSBmcm9tICdAdGFuc3RhY2svcmVhY3QtcXVlcnknO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFBhZ2VOb3RGb3VuZCh7IFwiZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWRcIjogX19kYXRhQ29sbGVjdGlvbkl0ZW1JZCB9KSB7XG4gIGNvbnN0IGxvY2F0aW9uID0gdXNlTG9jYXRpb24oKTtcbiAgY29uc3QgcGFnZU5hbWUgPSBsb2NhdGlvbi5wYXRobmFtZS5zdWJzdHJpbmcoMSk7XG5cbiAgY29uc3QgeyBkYXRhOiBhdXRoRGF0YSwgaXNGZXRjaGVkIH0gPSB1c2VRdWVyeSh7XG4gICAgcXVlcnlLZXk6IFsndXNlciddLFxuICAgIHF1ZXJ5Rm46IGFzeW5jICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBiYXNlNDQuYXV0aC5tZSgpO1xuICAgICAgICByZXR1cm4geyB1c2VyLCBpc0F1dGhlbnRpY2F0ZWQ6IHRydWUgfTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJldHVybiB7IHVzZXI6IG51bGwsIGlzQXV0aGVudGljYXRlZDogZmFsc2UgfTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cIlBhZ2VOb3RGb3VuZDoyMzo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwibWluLWgtc2NyZWVuIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHAtNiBiZy1zbGF0ZS01MFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtfX2RhdGFDb2xsZWN0aW9uSXRlbUlkfT5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJQYWdlTm90Rm91bmQ6MjQ6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJtYXgtdy1tZCB3LWZ1bGxcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiUGFnZU5vdEZvdW5kOjI1OjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgc3BhY2UteS02XCI+XG4gICAgICAgICAgICAgICAgICAgIHsvKiA0MDQgRXJyb3IgQ29kZSAqL31cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cIlBhZ2VOb3RGb3VuZDoyNzoyMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMSBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cIlBhZ2VOb3RGb3VuZDoyODoyNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LTd4bCBmb250LWxpZ2h0IHRleHQtc2xhdGUtMzAwXCI+NDA0PC9oMT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJQYWdlTm90Rm91bmQ6Mjk6MjRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiaC0wLjUgdy0xNiBiZy1zbGF0ZS0yMDAgbXgtYXV0b1wiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHsvKiBNYWluIE1lc3NhZ2UgKi99XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJQYWdlTm90Rm91bmQ6MzM6MjBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJzcGFjZS15LTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cIlBhZ2VOb3RGb3VuZDozNDoyNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LW1lZGl1bSB0ZXh0LXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBhZ2UgTm90IEZvdW5kXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJQYWdlTm90Rm91bmQ6Mzc6MjRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTYwMCBsZWFkaW5nLXJlbGF4ZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgcGFnZSA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cIlBhZ2VOb3RGb3VuZDozODozN1wiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtbWVkaXVtIHRleHQtc2xhdGUtNzAwXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJwYWdlTmFtZVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtfX2RhdGFDb2xsZWN0aW9uSXRlbUlkfT5cIntwYWdlTmFtZX1cIjwvc3Bhbj4gY291bGQgbm90IGJlIGZvdW5kIGluIHRoaXMgYXBwbGljYXRpb24uXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgey8qIEFkbWluIE5vdGUgKi99XG4gICAgICAgICAgICAgICAgICAgIHtpc0ZldGNoZWQgJiYgYXV0aERhdGEuaXNBdXRoZW50aWNhdGVkICYmIGF1dGhEYXRhLnVzZXI/LnJvbGUgPT09ICdhZG1pbicgJiZcbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiUGFnZU5vdEZvdW5kOjQ0OjI0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cIm10LTggcC00IGJnLXNsYXRlLTEwMCByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItc2xhdGUtMjAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cIlBhZ2VOb3RGb3VuZDo0NToyOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLXN0YXJ0IHNwYWNlLXgtM1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiUGFnZU5vdEZvdW5kOjQ2OjMyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImZsZXgtc2hyaW5rLTAgdy01IGgtNSByb3VuZGVkLWZ1bGwgYmctb3JhbmdlLTEwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBtdC0wLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJQYWdlTm90Rm91bmQ6NDc6MzZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidy0yIGgtMiByb3VuZGVkLWZ1bGwgYmctb3JhbmdlLTQwMFwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cIlBhZ2VOb3RGb3VuZDo0OTozMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LWxlZnQgc3BhY2UteS0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cIlBhZ2VOb3RGb3VuZDo1MDozNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtc2xhdGUtNzAwXCI+QWRtaW4gTm90ZTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiUGFnZU5vdEZvdW5kOjUxOjM2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1zbGF0ZS02MDAgbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhpcyBjb3VsZCBtZWFuIHRoYXQgdGhlIEFJIGhhc24ndCBpbXBsZW1lbnRlZCB0aGlzIHBhZ2UgeWV0LiBBc2sgaXQgdG8gaW1wbGVtZW50IGl0IGluIHRoZSBjaGF0LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHsvKiBBY3Rpb24gQnV0dG9uICovfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiUGFnZU5vdEZvdW5kOjYwOjIwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwicHQtNlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cIlBhZ2VOb3RGb3VuZDo2MToyNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvJ31cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBweC00IHB5LTIgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LXNsYXRlLTcwMCBiZy13aGl0ZSBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLWxnIGhvdmVyOmJnLXNsYXRlLTUwIGhvdmVyOmJvcmRlci1zbGF0ZS0zMDAgdHJhbnNpdGlvbi1jb2xvcnMgZHVyYXRpb24tMjAwIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1vZmZzZXQtMiBmb2N1czpyaW5nLXNsYXRlLTUwMFwiPlxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3ZnIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiUGFnZU5vdEZvdW5kOjY1OjI4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctNCBoLTQgbXItMlwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cIlBhZ2VOb3RGb3VuZDo2NjozMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgc3Ryb2tlV2lkdGg9ezJ9IGQ9XCJNMyAxMmwyLTJtMCAwbDctNyA3IDdNNSAxMHYxMGExIDEgMCAwMDEgMWgzbTEwLTExbDIgMm0tMi0ydjEwYTEgMSAwIDAxLTEgMWgtM20tNiAwYTEgMSAwIDAwMS0xdi00YTEgMSAwIDAxMS0xaDJhMSAxIDAgMDExIDF2NGExIDEgMCAwMDEgMW0tNiAwaDZcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdvIEhvbWVcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj4pO1xuXG59Il0sImZpbGUiOiIvYXBwL3NyYy9saWIvUGFnZU5vdEZvdW5kLmpzeCJ9