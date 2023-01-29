export let container: HTMLDivElement;

export const initializeReactContainer = () => {
    container = document.createElement("div");
    document.body.replaceChildren(container)
}