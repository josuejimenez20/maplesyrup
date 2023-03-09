import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { resetDataNewProductProcess } from '../../../redux/slices/managmentProducts/products/newProduct';
import { AddNewProduct } from '../../../redux/actions/products/AddNewProduct';
import { FormatFetchData } from "../../../helpers/formatFetchData";
import { MessageError, MessageSuccess } from '../../../components/shared/molecules/AlertMessages';
import '../../../styles/ultimateUser/addProducts.css';

export function AddProducts() {

    const dispatch = useDispatch();

    const { loading, success, error } = useSelector((state) => state.products.new);


    const handleUploadProduct = (data) => {

        const today = new Date().toLocaleDateString();

        const formatToday = FormatFetchData(today);

        const in_offer = data.target.in_offer.value == "No" ? 0 : 1;

        const formData = {
            name: data.target.name.value,
            price: data.target.price.value,
            count: data.target.count.value,
            typeProduct: data.target.typeProduct.value,
            in_offer: in_offer,
            fileImage: data.target.fileImage.value,
            description: data.target.description.value,
            dateCreated: formatToday,

        }
        dispatch(AddNewProduct(formData));

    }

    useEffect(() => {
        if (success || error) {
            setTimeout(() => {
                dispatch(resetDataNewProductProcess());
            }, 2000);
        }
    }, [success, error])

    if (success) {
        return (<>
            <MessageSuccess message="El Producto fue agregado" />
        </>)
    }

    if (error) {
        return (<>
            <MessageError message="El Producto no pudo ser agregado" />
        </>)
    }

    return (<>
        <main>
            <form id="products_form"
                className="products_class"
                method="post" onSubmit={(e) => {
                    e.preventDefault()
                    handleUploadProduct(e);
                }}>

                <div className="form_div">

                    <h4 className="details_products">Detalles del producto.</h4>
                    <hr />
                    <br />

                    <label className="name_product formLabel">Nombre del producto</label>
                    <input id="name" type="text" className="field_class" />
                    <br />

                    <label className="ormLabel">Descripcion del producto</label>
                    <input id="description" type="textarea" className="field_class" />
                    <br />

                    <label className="formLabel">Precio:</label>
                    <input id="price" type="number" className="field_class" />
                    <br />
                    <br />

                    <label className="formLabel">Stock:</label>
                    <input id="count" type="number" className="field_class" />
                    <br />
                    <br />

                    <label >Accesorios:</label>
                    <input id="typeProduct" type="text" list="products" className="field_class" />
                    <datalist id="products">
                        <option value="Anillos">Anillos</option>
                        <option value="Collares">Collares</option>
                        <option value="Cabello">Cabello</option>
                        <option value="Decoración">Decoración</option>
                        <option value="Ropa">Ropa</option>
                        <option value="Aretes">Aretes</option>
                        <option value="Pulseras">Pulseras</option>
                    </datalist>
                    <br />
                    <br />

                    <label className="formLabel">Oferta:</label>
                    <select name="Offer_product" id="in_offer" className="field_class">
                        <option value="Sí">Sí</option>
                        <option value="No">No</option>
                    </select>
                    <br />
                    <br />

                    <label className="formLabel">Imagen</label>
                    <input id="fileImage" type="file" className="field_class" />

                </div>

                <div id="containerButtonSubmit">
                    <button
                        className="btn btn-primary"
                        type="submit    "
                    >Subir Producto</button>
                </div>

            </form>
        </main>

        <footer>
            <p>Creado por <a href="#">MapleSyrup</a></p>
        </footer>
    </>
    );
}
