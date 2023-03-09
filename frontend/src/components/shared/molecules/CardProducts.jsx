import React from "react";
import '../../../styles/shared/molecules/customCard/customCardProduct.css'

export function CardProducts() {
    return (<>
        <div className="card">
            <div className="card__side card__side--front card__side--front-1">
                <div className="card__description"><img src="https://images.unsplash.com/photo-1448932223592-d1fc686e76ea"></img></div>
            </div>
            <div className="card__side card__side--back card__side--back-1">
                <div className="card__description">
                    <h3 className="tittle">Titulo</h3>
                    <h6 className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat placeat praesentium officiis, quo dicta ullam ipsa neque.</h6>
                    <div className="containerButtons">
                        <button className="buttonsOptions">Compra</button>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

