import React from "react";
import Head from 'next/head'
import {GetStaticProps} from "next";
import client from "../contentful/index";
import {IHome, IHomeFields} from "../contentful";

type HomePropsType = {
    home: IHome
}

const Home:React.FC<HomePropsType> = ({home}) => {
    return (
        <>
            <Head>
                <title>NextJS App</title>
            </Head>

            <main>
                <h1>{home.fields.title}</h1>
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
