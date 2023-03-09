import React from 'react';
import '../../../styles/shared/atoms/customInput/customInput.css';

export function CustomInput() {
    return (
        <>
            <div className="form__group field">
                <input type="input" className="form__field" placeholder="Name" name="name" id='name' required />
                <label className="form__label">Que estas buscando?</label>
            </div>
        </>
    )
}
