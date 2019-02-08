import React from "react"
import Layout from "../components/layout"
import TQNumber from "../components/tq-calculator"
import TQCorrispondences from "../components/tq-corrispondences"

export default () => (
  <Layout>
    
    <TQNumber/>

    <h4>Trigrammaton Qabalah values:</h4>
    <p className="TQValues">A=5  B=20  C=2  D=23  E=13  F=12  G=11  H=3  I=0  J=7  K=17 L=1  M=21
N=24 <br/>O=10  P=4  Q=16  R=14  S=15  T=9  U=25  V=22  W=8  X=6  Y=18  Z=19  &=26</p>

    <TQCorrispondences/>
	

  </Layout>
)