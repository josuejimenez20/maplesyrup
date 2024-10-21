import React from "react";
import { Container, Typography } from '@mui/material'
import '../../styles/about/about.css';


export function About() {
    return (<>

        <Container
            sx={{
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: 'black',
                height: '100vh',
            }}>

            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: 'black',
                    width: '20%',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <Typography variant="body2" marginBottom={3} color="white" textAlign='center'>Contáctanos vía Instagram <br /></Typography>
                <div><a class="button" href="https://instagram.com/_miel.demaple?igshid=YmMyMTA2M2Y=" target="_blank">Miel De Maple</a></div>
            </Container>

            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: 'black',
                    height: '100vh',
                    width: '90%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 0.8
                }}>
                <h1 className="edu-au-vic-wa-nt-guides mar_edu">Satisfaccion en todos tus productos</h1>
                <p className="edu-au-vic-wa-nt-guides second-principal-title">
                    Miel de maple es el bazar de ropa y joyería más importante de Hidalgo.
                </p>
                <h1 className="google-font-pacific">Más acerca de nosotros</h1>
                <p className="pacific">
                    Miel de maple es el bazar de ropa y joyería más importante de Hidalgo.
                </p>
                <h1 className="google-font-pacific">Somos parte de tu vida diaria</h1>
                <p className="pacific">
                    Para garantizarte un estilo increíble, nuestra intención es darte mercancía de calidad a los precios más bajos, ofreciendo una agradable experiencia de compra.
                </p>

                <h1 className="google-font-pacific">Nuestra misión</h1>
                <p className="pacific">
                    Ser el principal proveedor de ropa y joyería de la mejor calidad, siempre orientados a dar alto valor ofreciendo bienes y servicios sobresalientes, impulsados por nuestros valores.
                </p>

                <h1 className="google-font-pacific">Nuestra filosofía</h1>
                <p className="pacific">
                    Siempre orientados a brindar valor excepcional: calidad y precio en comparación con otros bazares y cadenas de tiendas reconocidas.
                </p>

                <h1 className="google-font-pacific">Nuestra garantía</h1>
                <p className="pacific">
                    Ofrecemos una garantía de satisfacción del 100%. Nos esmeramos en que obtengas los mejores precios y brindarte un servicio de la mayor calidad. Esto nos permite garantizar al 100% la satisfacción de nuestros Socios.
                </p>
            </Container>
        </Container>
    </>);
}