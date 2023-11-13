import styled from "styled-components"
import Wrapper from "../Layout/Wrapper"
import Center from "../Layout/Center"


export default function Banner() {
    return (
        <div className="absolute top-0 h-[80px] lg:h-[50px] flex items-center justify-center w-full bg-red-600">
            <Wrapper>
                <Center>
                    <p className="text-white text-[14px] lg:text-[16px] text-center  uppercase">Utilizează codul <b>(MB10)</b> până pe 15 ianuarie 2024 pentru a obține <b>10% reducere</b>.</p>
                </Center>
            </Wrapper>
        </div>
    )
}