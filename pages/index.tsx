import React from "react";
import Head from 'next/head'
import {GetStaticProps} from "next";
import client from "../contentful/index";
import {IHome, IHomeFields} from "../contentful";
import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import {Container, Row, Col} from 'reactstrap'

type HomePropsType = {
    home: IHome
}

const Home: React.FC<HomePropsType> = ({home}) => {
    return (
        <>
            <Head>
                <title>NextJS App</title>
            </Head>

            <main>
                <div
                    className={"text-center p-5 text-white"}
                    style={{
                        background: `url("http:${home.fields.background?.fields.file.url}") no-repeat center / cover`,
                        minHeight: 300
                    }}
                >
                    <h1 className={"mt-5"}>{home.fields.title}</h1>

                    <div className={"mb-5"}>
                        {documentToReactComponents(home.fields.description!)}
                    </div>
                </div>
            </main>
        </>
    )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
    const home = await client.getEntries<IHomeFields>({
        content_type: 'home',
        limit: 1
    })

    const [homePage] = home.items

    return {
        props: {
            home: homePage
        }
    }
}
