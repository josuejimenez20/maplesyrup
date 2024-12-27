import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { MessageError, MessageSuccess } from "../../../shared/molecules/AlertMessages";
import "../../../../styles/ultimateUser/addProducts.css";
import { GetProductInformationById } from "../../../../redux/actions/products/editProduct/getProductInformationById";
import { editProductInformation } from "../../../../redux/actions/products/editProduct/editProductInformation";

export function EditProductForm() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { productInformation, error, loading } = useSelector((state) => state.products.editProductInformation);
    const { success, error: errorEditInformation, loading: loadingEditInformation } = useSelector((state) => state.products.editInformation);

    const { id_product: id_product_params } = useParams();

    const [inOffer, setInOffer] = useState(null);

    const handleUploadProduct = (data) => {

        const in_offer = data.target.in_offer.value === "No" ? 0 : 1;

        const formData = new FormData();

        formData.append("product_id", id_product_params);
        formData.append("name", data.target.name.value);
        formData.append("price", data.target.price.value);
        formData.append("count", data.target.count.value);
        formData.append("typeProduct", data.target.typeProduct.value);
        formData.append("in_offer", in_offer);
        formData.append("description", data.target.description.value);

        // Add image
        const file = data.target.fileImage.files[0];
        if (file) {
            formData.append("fileImage", file);
        } else {
            formData.append("fileImage", productInformation.path_image
            );
        }

        dispatch(editProductInformation(formData))
    };

    useEffect(() => {
        dispatch(GetProductInformationById(id_product_params))
    }, []);

    useEffect(() => {

        if (productInformation) {
            setInOffer(productInformation.in_offer === 1 ? true : false)
        }
    }, [productInformation])

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                navigate("/UltimateUser/edit-product")
            }, 1500);
        }
    }, [success])

    if (success) {
        return (
            <>
                <MessageSuccess message="El Producto fue editado" />
            </>
        );
    }

    if (error) {
        return (
            <>
                <MessageError message="El Producto no pudo ser editado" />
            </>
        );
    }

    return (
        <>
            {
                productInformation === null ? "" :
                    <>
                        <form
                            id="products_form"
                            className="products_class"
                            method="post"
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleUploadProduct(e);
                            }}
                        >
                            <div className="form_div">
                                <Typography variant="h5" color="white" className="details_products">Editar producto.</Typography>
                                <hr />
                                <br />
                                <label className="name_product formLabel">Nombre del producto</label>
                                <input id="name" type="text" className="field_class" defaultValue={productInformation.name} />
                                <br />
                                <label className="ormLabel">Descripcion del producto</label>
                                <input id="description" type="textarea" className="field_class" defaultValue={productInformation.description} />
                                <br />
                                <label className="formLabel">Precio:</label>
                                <input id="price" type="number" className="field_class" defaultValue={productInformation.price} />
                                <br />
                                <br />
                                <label className="formLabel">Stock:</label>
                                <input id="count" type="number" className="field_class" defaultValue={productInformation.count} />
                                <br />
                                <br />
                                <label>Accesorios:</label>
                                <input id="typeProduct" type="text" list="products" className="field_class" defaultValue={productInformation.typeProduct} />
                                <datalist id="products" defaultValue={inOffer}>
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
                                <select
                                    name="Offer_product"
                                    id="in_offer"
                                    className="field_class"
                                >
                                    <option value={inOffer ? "Si" : "No"}>{inOffer ? "Si" : "No"}</option>
                                    <option value={inOffer ? "No" : "Si"}>{inOffer ? "No" : "Si"}</option>
                                </select>
                                <br />
                                <br />
                                <label className="formLabel">Imagen</label>
                                <input id="fileImage" type="file" className="field_class" />
                            </div>
                            <div id="containerButtonSubmit">
                                <button className="btn btn-primary" type="submit">
                                    Subir Producto
                                </button>
                            </div>
                        </form>
                        <footer>
                            <p>Creado por <a href="#">MapleSyrup</a></p>
                        </footer>
                    </>

            }

        </>


    );
}
