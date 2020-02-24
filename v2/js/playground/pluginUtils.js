define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /** Creates a set of util functions which is exposed to Plugins to make it easier to build consistent UIs */
    exports.createUtils = (sb) => {
        const sandbox = sb;
        const ts = sandbox.ts;
        const requireURL = (path) => {
            // https://unpkg.com/browse/typescript-playground-presentation-mode@0.0.1/dist/x.js => unpkg/browse/typescript-playground-presentation-mode@0.0.1/dist/x
            const isDev = document.location.host.includes('localhost');
            const prefix = isDev ? 'local/' : 'unpkg/typescript-playground-presentation-mode/dist/';
            return prefix + path;
        };
        const el = (str, el, container) => {
            const para = document.createElement(el);
            para.innerHTML = str;
            container.appendChild(para);
        };
        const createASTTree = (node) => {
            const div = document.createElement('div');
            div.className = "ast";
            const infoForNode = (node) => {
                const name = ts.SyntaxKind[node.kind];
                return {
                    name,
                };
            };
            const renderLiteralField = (key, value) => {
                const li = document.createElement('li');
                li.innerHTML = `${key}: ${value}`;
                return li;
            };
            const renderSingleChild = (key, value) => {
                const li = document.createElement('li');
                li.innerHTML = `${key}: <strong>${ts.SyntaxKind[value.kind]}</strong>`;
                return li;
            };
            const renderManyChildren = (key, value) => {
                const li = document.createElement('li');
                const nodes = value.map(n => "<strong>&nbsp;&nbsp;" + ts.SyntaxKind[n.kind] + "<strong>").join("<br/>");
                li.innerHTML = `${key}: [<br/>${nodes}</br>]`;
                return li;
            };
            const renderItem = (parentElement, node) => {
                const ul = document.createElement('ul');
                parentElement.appendChild(ul);
                ul.className = 'ast-tree';
                const info = infoForNode(node);
                const li = document.createElement('li');
                ul.appendChild(li);
                const a = document.createElement('a');
                a.textContent = info.name;
                li.appendChild(a);
                const properties = document.createElement('ul');
                properties.className = 'ast-tree';
                li.appendChild(properties);
                Object.keys(node).forEach(field => {
                    if (typeof field === "function")
                        return;
                    if (field === "parent" || field === "flowNode")
                        return;
                    const value = node[field];
                    if (typeof value === "object" && Array.isArray(value) && "pos" in value[0] && "end" in value[0]) {
                        //  Is an array of Nodes
                        properties.appendChild(renderManyChildren(field, value));
                    }
                    else if (typeof value === "object" && "pos" in value && "end" in value) {
                        // Is a single child property
                        properties.appendChild(renderSingleChild(field, value));
                    }
                    else {
                        properties.appendChild(renderLiteralField(field, value));
                    }
                });
            };
            renderItem(div, node);
            return div;
        };
        return {
            /** Use this to make a few dumb element generation funcs */
            el,
            /** Get a relative URL for something in your dist folder depending on if you're in dev mode or not */
            requireURL,
            /** Returns a div which has an interactive AST a TypeScript AST by passing in the root node */
            createASTTree
        };
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Z2luVXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wbGF5Z3JvdW5kL3NyYy9wbHVnaW5VdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFHQSw0R0FBNEc7SUFDL0YsUUFBQSxXQUFXLEdBQUcsQ0FBQyxFQUFPLEVBQUUsRUFBRTtRQUNyQyxNQUFNLE9BQU8sR0FBWSxFQUFFLENBQUE7UUFDM0IsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQTtRQUVyQixNQUFNLFVBQVUsR0FBRyxDQUFDLElBQVksRUFBRSxFQUFFO1lBQ2xDLHdKQUF3SjtZQUN4SixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUE7WUFDMUQsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLHFEQUFxRCxDQUFBO1lBQ3ZGLE9BQU8sTUFBTSxHQUFHLElBQUksQ0FBQTtRQUN0QixDQUFDLENBQUE7UUFFRCxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQVcsRUFBRSxFQUFVLEVBQUUsU0FBa0IsRUFBRSxFQUFFO1lBQ3pELE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUE7WUFDdkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUE7WUFDcEIsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUM3QixDQUFDLENBQUE7UUFFRCxNQUFNLGFBQWEsR0FBRyxDQUFDLElBQVUsRUFBRSxFQUFFO1lBQ25DLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDekMsR0FBRyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUE7WUFFckIsTUFBTSxXQUFXLEdBQUcsQ0FBQyxJQUFVLEVBQUUsRUFBRTtnQkFDakMs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QUFLLENBQUMsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7d0JBQy9GLHdCQUF3Qjt3QkFDeEIsVUFBVSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQTtxQkFDekQ7eUJBQU0sSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksS0FBSyxJQUFJLEtBQUssSUFBSSxLQUFLLElBQUksS0FBSyxFQUFFO3dCQUN4RSw2QkFBNkI7d0JBQzdCLFVBQVUsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUE7cUJBQ3hEO3lCQUFNO3dCQUNMLFVBQVUsQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUE7cUJBQ3pEO2dCQUNILENBQUMsQ0FBQyxDQUFBO1lBQ0osQ0FBQyxDQUFBO1lBRUQsVUFBVSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQTtZQUNyQixPQUFPLEdBQUcsQ0FBQTtRQUNaLENBQUMsQ0FBQTtRQUdELE9BQU87WUFDTCwyREFBMkQ7WUFDM0QsRUFBRTtZQUNGLHFHQUFxRztZQUNyRyxVQUFVO1lBQ1YsOEZBQThGO1lBQzlGLGFBQWE7U0FDZCxDQUFBO0lBQ0gsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBTYW5kYm94IH0gZnJvbSAndHlwZXNjcmlwdC1zYW5kYm94J1xuaW1wb3J0IHR5cGUgeyBOb2RlIH0gZnJvbSBcInR5cGVzY3JpcHRcIlxuXG4vKiogQ3JlYXRlcyBhIHNldCBvZiB1dGlsIGZ1bmN0aW9ucyB3aGljaCBpcyBleHBvc2VkIHRvIFBsdWdpbnMgdG8gbWFrZSBpdCBlYXNpZXIgdG8gYnVpbGQgY29uc2lzdGVudCBVSXMgKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVVdGlscyA9IChzYjogYW55KSA9PiB7XG4gIGNvbnN0IHNhbmRib3g6IFNhbmRib3ggPSBzYiBcbiAgY29uc3QgdHMgPSBzYW5kYm94LnRzXG5cbiAgY29uc3QgcmVxdWlyZVVSTCA9IChwYXRoOiBzdHJpbmcpID0+IHtcbiAgICAvLyBodHRwczovL3VucGtnLmNvbS9icm93c2UvdHlwZXNjcmlwdC1wbGF5Z3JvdW5kLXByZXNlbnRhdGlvbi1tb2RlQDAuMC4xL2Rpc3QveC5qcyA9PiB1bnBrZy9icm93c2UvdHlwZXNjcmlwdC1wbGF5Z3JvdW5kLXByZXNlbnRhdGlvbi1tb2RlQDAuMC4xL2Rpc3QveFxuICAgIGNvbnN0IGlzRGV2ID0gZG9jdW1lbnQubG9jYXRpb24uaG9zdC5pbmNsdWRlcygnbG9jYWxob3N0JylcbiAgICBjb25zdCBwcmVmaXggPSBpc0RldiA/ICdsb2NhbC8nIDogJ3VucGtnL3R5cGVzY3JpcHQtcGxheWdyb3VuZC1wcmVzZW50YXRpb24tbW9kZS9kaXN0LydcbiAgICByZXR1cm4gcHJlZml4ICsgcGF0aFxuICB9XG5cbiAgY29uc3QgZWwgPSAoc3RyOiBzdHJpbmcsIGVsOiBzdHJpbmcsIGNvbnRhaW5lcjogRWxlbWVudCkgPT4ge1xuICAgIGNvbnN0IHBhcmEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsKVxuICAgIHBhcmEuaW5uZXJIVE1MID0gc3RyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHBhcmEpXG4gIH1cblxuICBjb25zdCBjcmVhdGVBU1RUcmVlID0gKG5vZGU6IE5vZGUpID0+IHtcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGRpdi5jbGFzc05hbWUgPSBcImFzdFwiXG5cbiAgICBjb25zdCBpbmZvRm9yTm9kZSA9IChub2RlOiBOb2RlKSA9PiB7XG4gICAgICBjb25zdCBuYW1lID0gdHMuU3ludGF4S2luZFtub2RlLmtpbmRdXG4gICAgICByZXR1cm4ge1xuICAgICAgICBuYW1lLFxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHJlbmRlckxpdGVyYWxGaWVsZCA9IChrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICBsaS5pbm5lckhUTUwgPSBgJHtrZXl9OiAke3ZhbHVlfWBcbiAgICAgIHJldHVybiBsaVxuICAgIH1cblxuICAgIGNvbnN0IHJlbmRlclNpbmdsZUNoaWxkID0gKGtleTogc3RyaW5nLCB2YWx1ZTogTm9kZSkgPT4ge1xuICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICBsaS5pbm5lckhUTUwgPSBgJHtrZXl9OiA8c3Ryb25nPiR7dHMuU3ludGF4S2luZFt2YWx1ZS5raW5kXX08L3N0cm9uZz5gXG4gICAgICByZXR1cm4gbGlcbiAgICB9XG5cbiAgICBjb25zdCByZW5kZXJNYW55Q2hpbGRyZW4gPSAoa2V5OiBzdHJpbmcsIHZhbHVlOiBOb2RlW10pID0+IHtcbiAgICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgY29uc3Qgbm9kZXMgPSB2YWx1ZS5tYXAobiA9PiBcIjxzdHJvbmc+Jm5ic3A7Jm5ic3A7XCIgKyB0cy5TeW50YXhLaW5kW24ua2luZF0gKyBcIjxzdHJvbmc+XCIpLmpvaW4oXCI8YnIvPlwiKSBcbiAgICAgIGxpLmlubmVySFRNTCA9IGAke2tleX06IFs8YnIvPiR7bm9kZXN9PC9icj5dYFxuICAgICAgcmV0dXJuIGxpXG4gICAgfVxuICBcbiAgICBjb25zdCByZW5kZXJJdGVtID0gKHBhcmVudEVsZW1lbnQ6IEVsZW1lbnQsIG5vZGU6IE5vZGUpID0+IHtcbiAgICAgIGNvbnN0IHVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgICAgcGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZCh1bClcbiAgICAgIHVsLmNsYXNzTmFtZSA9ICdhc3QtdHJlZSdcblxuICAgICAgY29uc3QgaW5mbyA9IGluZm9Gb3JOb2RlKG5vZGUpXG4gIFxuICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICB1bC5hcHBlbmRDaGlsZChsaSlcbiAgXG4gICAgICBjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpXG4gICAgICBhLnRleHRDb250ZW50ID0gaW5mby5uYW1lIFxuICAgICAgbGkuYXBwZW5kQ2hpbGQoYSlcbiAgXG4gICAgICBjb25zdCBwcm9wZXJ0aWVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgICAgcHJvcGVydGllcy5jbGFzc05hbWUgPSAnYXN0LXRyZWUnXG4gICAgICBsaS5hcHBlbmRDaGlsZChwcm9wZXJ0aWVzKVxuXG4gICAgICBPYmplY3Qua2V5cyhub2RlKS5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBmaWVsZCA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm5cbiAgICAgICAgaWYgKGZpZWxkID09PSBcInBhcmVudFwiIHx8IGZpZWxkID09PSBcImZsb3dOb2RlXCIpIHJldHVyblxuXG4gICAgICAgIGNvbnN0IHZhbHVlID0gKG5vZGUgYXMgYW55KVtmaWVsZF0gXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgXCJwb3NcIiBpbiB2YWx1ZVswXSAmJiBcImVuZFwiIGluIHZhbHVlWzBdKSB7XG4gICAgICAgICAgLy8gIElzIGFuIGFycmF5IG9mIE5vZGVzXG4gICAgICAgICAgcHJvcGVydGllcy5hcHBlbmRDaGlsZChyZW5kZXJNYW55Q2hpbGRyZW4oZmllbGQsIHZhbHVlKSlcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgXCJwb3NcIiBpbiB2YWx1ZSAmJiBcImVuZFwiIGluIHZhbHVlKSB7XG4gICAgICAgICAgLy8gSXMgYSBzaW5nbGUgY2hpbGQgcHJvcGVydHlcbiAgICAgICAgICBwcm9wZXJ0aWVzLmFwcGVuZENoaWxkKHJlbmRlclNpbmdsZUNoaWxkKGZpZWxkLCB2YWx1ZSkpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJvcGVydGllcy5hcHBlbmRDaGlsZChyZW5kZXJMaXRlcmFsRmllbGQoZmllbGQsIHZhbHVlKSlcbiAgICAgICAgfVxuICAgICAgfSkgIFxuICAgIH1cbiAgXG4gICAgcmVuZGVySXRlbShkaXYsIG5vZGUpXG4gICAgcmV0dXJuIGRpdlxuICB9XG5cblxuICByZXR1cm4ge1xuICAgIC8qKiBVc2UgdGhpcyB0byBtYWtlIGEgZmV3IGR1bWIgZWxlbWVudCBnZW5lcmF0aW9uIGZ1bmNzICovICAgIFxuICAgIGVsLFxuICAgIC8qKiBHZXQgYSByZWxhdGl2ZSBVUkwgZm9yIHNvbWV0aGluZyBpbiB5b3VyIGRpc3QgZm9sZGVyIGRlcGVuZGluZyBvbiBpZiB5b3UncmUgaW4gZGV2IG1vZGUgb3Igbm90ICovXG4gICAgcmVxdWlyZVVSTCxcbiAgICAvKiogUmV0dXJucyBhIGRpdiB3aGljaCBoYXMgYW4gaW50ZXJhY3RpdmUgQVNUIGEgVHlwZVNjcmlwdCBBU1QgYnkgcGFzc2luZyBpbiB0aGUgcm9vdCBub2RlICovXG4gICAgY3JlYXRlQVNUVHJlZVxuICB9XG59XG5cbmV4cG9ydCB0eXBlIFBsdWdpblV0aWxzID0gUmV0dXJuVHlwZTx0eXBlb2YgY3JlYXRlVXRpbHM+XG4iXX0=