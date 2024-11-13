"use client";
import React from "react";
import Image from "next/image";
import { FaCheck } from "react-icons/fa";
import {
  hypnoticV1,
  snakesStyle,
  netV2,
} from "../common/helpers/patternStyles";

const IndexContent = () => {
  return (
    <div className="main-container overflow-hidden">
      <div
        style={hypnoticV1}
        className={
          "p-5 w-full min-h-[50vh] h-auto presentation-part-1-background  flex justify-center items-center animate__animated animate__fadeInLeft"
        }
      >
        <div className="w-full md:w-1/2 flex flex-col md:flex-row items-center">
          <div className="w-full flex flex-col md:flex-row items-center">
            <Image
              src="/images/caja-plus-index-1.png"
              alt="caja-plus-index-1.png"
              width={1920}
              height={1080}
              className="w-[300px] h-[300px] object-cover rounded-[100%]  mb-4 md:mb-0"
              priority
            />
            <div className="md:ml-5 text-center md:text-left">
              <h1 className="text-3xl font-bold title-color">
                Ve crecer tus ahorros
              </h1>
              <br />
              <p className="text-sm">
                Caja Plus, tu cuenta de ahorros sin cuota de manejo ni
                complicaciones
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        style={snakesStyle}
        className={
          "p-5 w-full min-h-[50vh] h-auto presentation-part-2-background flex justify-center items-center animate__animated animate__fadeInRight"
        }
      >
        <div className="w-full md:w-1/2 flex flex-col md:flex-row items-center">
          <div className="w-full flex flex-col md:flex-row-reverse items-center">
            <Image
              src="/images/caja-plus-index-2.png"
              alt="caja-plus-index-2.png"
              width={1920}
              height={1080}
              className="w-[300px] h-[300px] object-cover rounded-[100%]  mb-4 md:mb-0"
              priority
            />
            <div className="md:mr-5 text-center md:text-left">
              <h1 className="text-3xl font-bold title-color">
                Conoce los beneficios de Caja Plus
              </h1>
              <br />
              <ul>
                <li className="text-sm flex items-center  md:justify-start">
                  <FaCheck className="mr-2  title-color" />
                  Sin cuota de manejo
                </li>
                <li className="text-sm flex items-center  md:justify-start">
                  <FaCheck className="mr-2  title-color" />
                  12% de rendimiento efectivo anual
                </li>
                <li className="text-sm flex items-center  md:justify-start">
                  <FaCheck className="mr-2  title-color" />
                  Transferencias sin costo
                </li>
                <li className="text-sm flex items-center  md:justify-start">
                  <FaCheck className="mr-2  title-color" />
                  Retiros sin costo en cajeros BCSC
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div
        style={netV2}
        className={
          "p-5 w-full min-h-[50vh] h-auto presentation-part-3-background  flex justify-center items-center animate__animated animate__fadeInLeft"
        }
      >
        <div className="w-full md:w-1/2 flex flex-col md:flex-row items-center">
          <div className="w-full flex flex-col md:flex-row items-center">
            <Image
              src="/images/caja-plus-index-3.png"
              alt="caja-plus-index-3.png"
              width={1920}
              height={1080}
              className="w-[300px] h-[300px] object-cover rounded-[100%]  mb-4 md:mb-0"
              priority
            />
            <div className="md:ml-5 text-center md:text-left">
              <h1 className="text-3xl font-bold title-color">
                ¿Qué esperas para obtener tu nueva cuenta?
              </h1>
              <br />
              <p className="text-sm">
                Alcanza tus metas ahorrando de forma efectiva y viendo cómo tus
                ahorros crecen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexContent;
