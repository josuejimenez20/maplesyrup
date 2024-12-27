import React, { useEffect, useState } from "react";
import { TextField, Button, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ListProducts from "./ListProducts";
import { GetListProductByWord } from '../../../../redux/actions/products/editProduct/GetListProductByWord';
import { initialStateProductInformation } from "../../../../redux/slices/managmentProducts/products/editProduct/editProductInformationSlice";
import { initialStateProductsByWord } from "../../../../redux/slices/managmentProducts/products/editProduct/listProductByWord";

export default function SearchProduct() {
    const dispatch = useDispatch();

    const { loading, products, error } = useSelector((state) => state.products.listEdit);

    const [searchWord, setSearchWord] = useState("");

    const handleSearch = () => {
        dispatch(GetListProductByWord(searchWord))
    };

    useEffect(() => {
        dispatch(initialStateProductInformation())
        dispatch(initialStateProductsByWord())
    }, [])

    return (
        <>
            <Stack
                direction="row"
                spacing={2}
                sx={{ justifyContent: "center", alignItems: "center", mt: 4 }}
            >
                <TextField
                    label="Buscar"
                    variant="outlined"
                    value={searchWord}
                    onChange={(e) => setSearchWord(e.target.value)}
                    sx={{
                        width: "300px",
                        backgroundColor: "white",
                        borderRadius: "4px",
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSearch}
                >
                    Buscar
                </Button>
            </Stack>
            <ListProducts />
        </>
    );
}