import React from "react";
import Layout from "../../components/layout";
import SEO from "../../components/seo";

export default () => (
  <Layout>
    <SEO title={"About Greek"} />
    <h2>About Greek Gematria</h2>

    <h4>Greek Gematria values:</h4>
    <p className="TQValues">
      Αα=1 Ββ=2 Γγ=3 Δδ=4 Εε=5 Ϝϛ=6 Ζζ=7 Ηη=8 Θθ=9 Ιι=10 Κκ=20 Λλ=30 Μμ=40 Νν=50
      Ξξ=60 Οο=70 Ππ=80 Ϙϙ=90 Ρρ=100 Σσς=200 Ττ=300 Υυ=400 Φφ=500 Χχ=600 Ψψ=700
      Ωω=800 ϡ=900
    </p>
    <h4>Isopsephy</h4>
    <p>
      Isopsephy (/ˈaɪsəpˌsɛfi/; ἴσος isos meaning "equal" and ψῆφος psephos
      meaning "pebble") or isopsephism is the practice of adding up the number
      values of the letters in a word to form a single number. The total number
      is then used as a metaphorical bridge to other words evaluating the equal
      number, which satisfies isos or "equal" in the term. The early Greeks used
      pebbles arranged in patterns to learn arithmetic and geometry, which
      corresponds to psephos or "pebble" and "counting" in the term. Isopsephy
      is related to gematria—the same practice using the Hebrew alphabet and,
      later, also the English alphabet—and the ancient number systems of many
      other peoples (for the Arabic alphabet version, see Abjad numerals). A
      gematria of Latin script languages was also popular in Europe from the
      Middle Ages to the Renaissance and its legacy remains in code-breaking,
      numerology and Masonic symbolism today (see arithmancy).
    </p>

    <a href="https://en.wikipedia.org/wiki/Isopsephy">
      <blockquote cite="https://en.wikipedia.org/wiki/Isopsephy">
        Wikipedia.org
      </blockquote>
    </a>
  </Layout>
);
