import React from 'react';
import '../../../styles/shared/atoms/customInput/customInput.css';

export function CustomInput() {
    return (
        <div className="form__group field">
            <input type="text" className="form__field" placeholder="Name" name="name" id="name" required />
            <label className="form__label" htmlFor="name">¿Qué estás buscando?</label>
        </div>
    );
}
