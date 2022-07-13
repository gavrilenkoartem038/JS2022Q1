class Filter {
    public static filter(element: HTMLInputElement): string[] {
        const arr: string[] = [];
        const checkboxElements = document.querySelectorAll<HTMLInputElement>(`input[name=${element.name}]`);
        checkboxElements.forEach((el): void => {
            if (el.checked) {
                arr.push(el.id);
            }
        });
        if (arr.length == 0) {
            checkboxElements.forEach((el) => arr.push(el.id));
        }
        return arr;
    }
}

export default Filter;
