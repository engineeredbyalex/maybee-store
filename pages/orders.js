// importing Header
import Header from "@/components/Basic/Header";
// importing Layout
import Layout from "@/components/Layout/Layout";
// importing useState and useEffect
import { useState,useEffect } from "react";
// importing axios
import axios from "axios";
// importing session
import { useSession } from "next-auth/react";

export default function Orders() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState([])
    const {data : session} = useSession()


    return (
        <>
            <Header />
            <Layout>

            </Layout>
        </>
    )
}