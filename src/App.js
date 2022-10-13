import React from "react";

import AllPagesPDFViewer from "./Components/pdfDisplay";
import samplePDF from "./output-3.pdf";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

import "./styles.css";

export default function App() {
  return (
    <div className="App">
      {/* <h4>Single Page</h4>
      <SinglePagePDFViewer pdf={samplePDF} />

      <hr /> */}

      <h4>Pdf display</h4>
      <div className="all-page-container">
        <AllPagesPDFViewer pdf={samplePDF} />
      </div>

      <hr />
    </div>
  );
}