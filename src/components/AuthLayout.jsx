import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/AuthLayout.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=fc940917"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/components/AuthLayout.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=fc940917"; const React = __vite__cjsImport3_react.__esModule ? __vite__cjsImport3_react.default : __vite__cjsImport3_react;
export default function AuthLayout({ icon: Icon, title, subtitle, footer, children, "data-collection-item-id": __dataCollectionItemId }) {
  return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/AuthLayout:5:4", "data-dynamic-content": "true", className: "min-h-screen flex items-center justify-center bg-background px-4", "data-collection-item-id": __dataCollectionItemId, children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/AuthLayout:6:6", "data-dynamic-content": "true", className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/AuthLayout:7:8", "data-dynamic-content": "true", className: "text-center mb-10", children: [
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/AuthLayout:8:10", "data-dynamic-content": "false", className: "inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary mb-4", children: /* @__PURE__ */ jsxDEV(Icon, { "data-source-location": "components/AuthLayout:9:12", "data-dynamic-content": "false", className: "w-7 h-7 text-primary-foreground", "aria-hidden": "true" }, void 0, false, {
        fileName: "/app/src/components/AuthLayout.jsx",
        lineNumber: 28,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/app/src/components/AuthLayout.jsx",
        lineNumber: 27,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("h1", { "data-source-location": "components/AuthLayout:11:10", "data-dynamic-content": "true", className: "text-3xl font-bold tracking-tight text-foreground", "data-collection-item-field": "title", "data-collection-item-id": __dataCollectionItemId, children: title }, void 0, false, {
        fileName: "/app/src/components/AuthLayout.jsx",
        lineNumber: 30,
        columnNumber: 11
      }, this),
      subtitle && /* @__PURE__ */ jsxDEV("p", { "data-source-location": "components/AuthLayout:12:23", "data-dynamic-content": "true", className: "text-muted-foreground mt-2", "data-collection-item-field": "subtitle", "data-collection-item-id": __dataCollectionItemId, children: subtitle }, void 0, false, {
        fileName: "/app/src/components/AuthLayout.jsx",
        lineNumber: 31,
        columnNumber: 24
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/components/AuthLayout.jsx",
      lineNumber: 26,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/AuthLayout:14:8", "data-dynamic-content": "true", className: "bg-card rounded-2xl shadow-sm border border-border p-8", children }, void 0, false, {
      fileName: "/app/src/components/AuthLayout.jsx",
      lineNumber: 33,
      columnNumber: 9
    }, this),
    footer && /* @__PURE__ */ jsxDEV("p", { "data-source-location": "components/AuthLayout:18:10", "data-dynamic-content": "true", className: "text-center text-sm text-muted-foreground mt-6", "data-collection-item-field": "footer", "data-collection-item-id": __dataCollectionItemId, children: footer }, void 0, false, {
      fileName: "/app/src/components/AuthLayout.jsx",
      lineNumber: 37,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/src/components/AuthLayout.jsx",
    lineNumber: 25,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/src/components/AuthLayout.jsx",
    lineNumber: 24,
    columnNumber: 5
  }, this);
}
_c = AuthLayout;
var _c;
$RefreshReg$(_c, "AuthLayout");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/components/AuthLayout.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/components/AuthLayout.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBUVk7Ozs7Ozs7Ozs7Ozs7Ozs7QUFSWixPQUFPQSxXQUFXO0FBRWxCLHdCQUF3QkMsV0FBVyxFQUFFQyxNQUFNQyxNQUFNQyxPQUFPQyxVQUFVQyxRQUFRQyxVQUFVLDJCQUEyQkMsdUJBQXVCLEdBQUc7QUFDdkksU0FDRSx1QkFBQyxTQUFJLHdCQUFxQiw2QkFBNEIsd0JBQXFCLFFBQU8sV0FBVSxvRUFBbUUsMkJBQXlCQSx3QkFDdEwsaUNBQUMsU0FBSSx3QkFBcUIsNkJBQTRCLHdCQUFxQixRQUFPLFdBQVUsbUJBQzFGO0FBQUEsMkJBQUMsU0FBSSx3QkFBcUIsNkJBQTRCLHdCQUFxQixRQUFPLFdBQVUscUJBQzFGO0FBQUEsNkJBQUMsU0FBSSx3QkFBcUIsOEJBQTZCLHdCQUFxQixTQUFRLFdBQVUsaUZBQzVGLGlDQUFDLFFBQUssd0JBQXFCLDhCQUE2Qix3QkFBcUIsU0FBUSxXQUFVLG1DQUFrQyxlQUFZLFVBQTdJO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFBbUosS0FEcko7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUVBO0FBQUEsTUFDQSx1QkFBQyxRQUFHLHdCQUFxQiwrQkFBOEIsd0JBQXFCLFFBQU8sV0FBVSxxREFBb0QsOEJBQTJCLFNBQVEsMkJBQXlCQSx3QkFBeUJKLG1CQUF0TztBQUFBO0FBQUE7QUFBQTtBQUFBLGFBQTRPO0FBQUEsTUFDM09DLFlBQVksdUJBQUMsT0FBRSx3QkFBcUIsK0JBQThCLHdCQUFxQixRQUFPLFdBQVUsOEJBQTZCLDhCQUEyQixZQUFXLDJCQUF5Qkcsd0JBQXlCSCxzQkFBak47QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUEwTjtBQUFBLFNBTHpPO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FNQTtBQUFBLElBQ0EsdUJBQUMsU0FBSSx3QkFBcUIsOEJBQTZCLHdCQUFxQixRQUFPLFdBQVUsMERBQzFGRSxZQURIO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FFQTtBQUFBLElBQ0NELFVBQ0QsdUJBQUMsT0FBRSx3QkFBcUIsK0JBQThCLHdCQUFxQixRQUFPLFdBQVUsa0RBQWlELDhCQUEyQixVQUFTLDJCQUF5QkUsd0JBQXlCRixvQkFBbk87QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUEwTztBQUFBLE9BWjVPO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FjQSxLQWZGO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FnQkE7QUFFSjtBQUFDRyxLQXBCdUJSO0FBQVUsSUFBQVE7QUFBQSxhQUFBQSxJQUFBIiwibmFtZXMiOlsiUmVhY3QiLCJBdXRoTGF5b3V0IiwiaWNvbiIsIkljb24iLCJ0aXRsZSIsInN1YnRpdGxlIiwiZm9vdGVyIiwiY2hpbGRyZW4iLCJfX2RhdGFDb2xsZWN0aW9uSXRlbUlkIiwiX2MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiQXV0aExheW91dC5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBdXRoTGF5b3V0KHsgaWNvbjogSWNvbiwgdGl0bGUsIHN1YnRpdGxlLCBmb290ZXIsIGNoaWxkcmVuLCBcImRhdGEtY29sbGVjdGlvbi1pdGVtLWlkXCI6IF9fZGF0YUNvbGxlY3Rpb25JdGVtSWQgfSkge1xuICByZXR1cm4gKFxuICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL0F1dGhMYXlvdXQ6NTo0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwibWluLWgtc2NyZWVuIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLWJhY2tncm91bmQgcHgtNFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtfX2RhdGFDb2xsZWN0aW9uSXRlbUlkfT5cbiAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL0F1dGhMYXlvdXQ6Njo2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidy1mdWxsIG1heC13LW1kXCI+XG4gICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL0F1dGhMYXlvdXQ6Nzo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgbWItMTBcIj5cbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9BdXRoTGF5b3V0Ojg6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHctMTQgaC0xNCByb3VuZGVkLTJ4bCBiZy1wcmltYXJ5IG1iLTRcIj5cbiAgICAgICAgICAgIDxJY29uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9BdXRoTGF5b3V0Ojk6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidy03IGgtNyB0ZXh0LXByaW1hcnktZm9yZWdyb3VuZFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGgxIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9BdXRoTGF5b3V0OjExOjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidGV4dC0zeGwgZm9udC1ib2xkIHRyYWNraW5nLXRpZ2h0IHRleHQtZm9yZWdyb3VuZFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwidGl0bGVcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17X19kYXRhQ29sbGVjdGlvbkl0ZW1JZH0+e3RpdGxlfTwvaDE+XG4gICAgICAgICAge3N1YnRpdGxlICYmIDxwIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9BdXRoTGF5b3V0OjEyOjIzXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidGV4dC1tdXRlZC1mb3JlZ3JvdW5kIG10LTJcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cInN1YnRpdGxlXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e19fZGF0YUNvbGxlY3Rpb25JdGVtSWR9PntzdWJ0aXRsZX08L3A+fVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvQXV0aExheW91dDoxNDo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiYmctY2FyZCByb3VuZGVkLTJ4bCBzaGFkb3ctc20gYm9yZGVyIGJvcmRlci1ib3JkZXIgcC04XCI+XG4gICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge2Zvb3RlciAmJlxuICAgICAgICA8cCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvQXV0aExheW91dDoxODoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInRleHQtY2VudGVyIHRleHQtc20gdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIG10LTZcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cImZvb3RlclwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtfX2RhdGFDb2xsZWN0aW9uSXRlbUlkfT57Zm9vdGVyfTwvcD5cbiAgICAgICAgfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+KTtcblxufSJdLCJmaWxlIjoiL2FwcC9zcmMvY29tcG9uZW50cy9BdXRoTGF5b3V0LmpzeCJ9