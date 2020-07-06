import React, { Component } from "react";
import {
  Document,
  Page,
  Text,
  Image,
  Font,
  PDFDownloadLink,
  View,
  PDFViewer,
} from "@react-pdf/renderer";
import { Table, Nav, Navbar } from "react-bootstrap";
import Axios from "axios";

export default class Quixote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      data2: [],
    };
  }
  componentDidMount = () => {
    console.log(localStorage.getItem("token"));
    const token = localStorage.getItem("token");
    if (token === null) {
      this.props.history.push("/");
    }
    this.getProduk();
  };
  getProduk = () => {
    Axios.get("http://localhost:9876/api/v2/produk/list").then((response) => {
      //   console.log(response.data.result);
      this.setState({
        data: response.data.result,
        data2: response.data.result,
      });
      console.log(response.data.result);
    });
  };
  pdfDownload = () => {
    return (
      <Document>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: "1" }}>
            <Text>nama barang </Text>
          </View>
          <View style={{ flex: "1" }}>
            <Text>Jumlah Barang</Text>
          </View>
          <View style={{ flex: "1" }}>
            <Text>Jumah Gambar</Text>
          </View>
          <View style={{ flex: "1" }}>
            <Text>Kategori</Text>
          </View>
        </View>
      </Document>
    );
  };
  PdfDownloads = () => {
    return (
      <Document>
        <Page>
          <Text style={{textAlign:'center', marginVertical:'20px'}}>Laporan Data Inventory</Text>
          <View style={{ flexDirection: "row", marginHorizontal:'10px' }}>
            <View style={{ flex: "1" }}>
              <Text>nama barang </Text>
            </View>
            <View style={{ flex: "1" }}>
              <Text>Jumlah Barang</Text>
            </View>
            <View style={{ flex: "1" }}>
              <Text>Jumah Gambar</Text>
            </View>
            <View style={{ flex: "1" }}>
              <Text>Kategori</Text>
            </View>
          </View>
        </Page>
      </Document>
    );
  };
  render() {
    return (
      <div>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand
            href="/"
            onClick={() => this.props.history.push("/home")}
          >
            Inventory
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link onClick={() => this.props.history.push("laporan")}>
              Laporan
            </Nav.Link>
          </Nav>
        </Navbar>
        <br />
        <h1 style={{ textAlign: "center", marginBottom: "100px" }}>
          Laporan Data Inventory
        </h1>
        <div style={{ margin: "0px 100px 0px 100px" }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nama Produk</th>
                <th>Jumlah Barang</th>
                <th>Jumlah Gambar</th>
                <th>Jenis Kategori</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((data) => {
                return (
                  <tr>
                    <td>{data.nama_produk}</td>
                    <td>{data.jumlah_barang} </td>
                    <td>{data.image.length} </td>
                    <td>{data.nama_kategori}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <PDFDownloadLink
            document={<this.PdfDownloads />}
            fileName="somename.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : "Unduh Laporan!"
            }
          </PDFDownloadLink>
        </div>
      </div>
    );
  }
}
