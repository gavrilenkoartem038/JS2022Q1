function setCheckboxStorage(name: string): string[] {
    const arr: string[] = [];
    const checkboxElements = document.querySelectorAll<HTMLInputElement>(`input[name=${name}]`);
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

export default setCheckboxStorage;
