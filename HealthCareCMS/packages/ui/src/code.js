import { jsx as _jsx } from "hono/jsx/jsx-runtime";
export function Code({ children, className, }) {
    return _jsx("code", { className: className, children: children });
}
