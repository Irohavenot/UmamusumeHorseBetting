// Simple reusable form generator
export const Form = (fields, onSubmit) => {
    const form = document.createElement("form");

    fields.forEach(f => {
        const input = document.createElement("input");
        input.type = f.type;
        input.placeholder = f.placeholder;
        input.id = f.id;
        input.required = true;
        form.appendChild(input);
    });

    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.textContent = "Submit";
    form.appendChild(submitBtn);

    form.onsubmit = (e) => {
        e.preventDefault(); 
        const values = {};
        fields.forEach(f => values[f.id] = document.getElementById(f.id).value);
        onSubmit(values);
    };

    return form;
};
