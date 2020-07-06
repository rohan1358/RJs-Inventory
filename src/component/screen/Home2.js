import React, { Component, useState } from "react";
import Axios from "axios";
import {
  Card,
  Button,
  Navbar,
  Nav,
  Form,
  FormControl,
  CardDeck,
  Modal,
  InputGroup,
  Dropdown,
  DropdownButton,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import Contoh from "./Example";
import ReactHTMLDatalist from "react-html-datalist";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      dataInput: {
        nama: "",
        jumlah_barang: "",
        kategori: "",
        image: null,
      },
      data: [],
      modal: false,
      MAdd: false,
      MKategori: false,
      listKategori: [],
      cars: [
        { id: 1, model: "CRV", company: "Honda" },
        { id: 2, model: "Accord", company: "Honda" },
        { id: 3, model: "800", company: "Maruti" },
        { id: 4, model: "Civic", company: "Honda" },
        { id: 5, model: "Model S", company: "Tesla" },
        { id: 6, model: "Model 3", company: "Tesla" },
        { id: 7, model: "Model X", company: "Tesla" },
        { id: 8, model: "Corolla", company: "Toyota" },
        { id: 9, model: "Rav4", company: "Toyota" },
        { id: 10, model: "Camry", company: "Toyota" },
        { id: 11, model: "Innova", company: "Toyota" },
        { id: 12, model: "Yaris", company: "Toyota" },
        { id: 13, model: "Prius", company: "Toyota" },
        { id: 14, model: "Highlander", company: "Toyota" },
        { id: 15, model: "Grand Cherokee", company: "Jeep" },
        { id: 16, model: "Wrangler", company: "Jeep" },
        { id: 17, model: "Comanche", company: "Jeep" },
      ],
    };
    this.fileInput = React.createRef();
  }

  handleChangeName = (event) => {
    console.log('event.target.value');
    console.log(event.target.value);
    this.setState((state) => ({
      dataInput: { ...state.dataInput, nama: event.target },
    }));
    event.preventDefault();
  };

  componentDidMount = () => {
    this.getProduk();
    this.getKategori();
    this.value();
  };
  getKategori = () => {
    Axios.get("http://localhost:9876/api/v2/kategori/kategori").then(
      (response) => {
        console.log(response.data.result);
        this.setState({ listKategori: response.data.result });
      }
    );
  };
  example = (event) => {
    console.log(event.target.value);
    this.setState({ food_id: event.target.value });
  };
  getProduk = () => {
    let data = [];

    Axios.get("http://localhost:9876/api/v2/produk/list").then((response) => {
      // console.log(response.data.result);
      this.setState({ data: response.data.result });
      console.log(response.data.result);
      Axios.get("http://localhost:9876/api/v2/image")
        .then((response) => {
          this.setState({ image: response.data.result.id_produk });
          data = response.data.result;
          this.getImage(data);
        })
        .then();
    });
  };
  getImage = (image) => {
    console.log(image);
    console.log(image);

    this.state.data.forEach((fun) => {
      image.forEach((image) => {
        if (fun.id_produk === image.id_produk) {
          console.log(image.image);
          // fun.nama_produk.push({ image });
          console.log(typeof fun);
          this.state.data.push(image.image);
        } else {
          console.log(fun);
        }
      });
    });
  };
  OModal = (data) => {
    console.log(data);
    this.setState({ modal: true, nama: data.nama_produk });
  };
  
  handleChange = (event) => {
    this.setState({
      kategori: event.target.kategori,
    });
  };
  handleChangeKategori = (event) => {
    this.setState((state) => ({
      dataInput: { ...state.dataInput, kategori: event.target.title },
    }));

    event.preventDefault();
  };
  handleChangeImage = (e) => {
    this.setState((state) => ({
      dataInput: { ...state.dataInput, image: e.target.files[0] },
    }));
  };
  handleChangeJumlahBarang = (e) => {
    this.setState((state) => ({
      dataInput: { ...state.dataInput, jumlah_barang: e.target.value },
    }));
  };
  handleSubmit = (event) => {
    // alert("Your favorite flavor is: " + this.state.value);
    const img = this.fileInput.current.files[0].name;
    console.log(`Selected file - ${img}`);

    event.preventDefault();
  };

  handleSubmitAdd = () => {
    const state = this.state;
    let formData = new FormData();
    formData.append("nama_produk", this.state.nama);
    formData.append("jumlah_barang", this.state.jumlahBarang);
    formData.append("id_kategori", this.state.kategori);
    formData.append("foto_produk", this.state.image);
    console.log(state.image);
    Axios.post("http://localhost:9876/api/v2/produk/insert", formData, {
      headers: { "content-type": "multipart/form-data" },
    }).then((response) => {
      console.log(response);
    });
  };
  deleteProduk = (data) => {
    console.log(data);
    Axios.delete(`http://localhost:9876/api/v2/produk/delete/${data}`).then(
      (response) => {
        console.log(response);
        window.location.reload(false);
      }
    );
  };
  handleSubmitKategori = () => {
    const state = this.state;
    console.log(state.kategori);
    const kategori = { nama_kategori: state.kategori };
    Axios.post(
      `http://localhost:9876/api/v2/kategori/insert`,
      kategori
      // formData
      // headers: { "content-type": "application/json; charset=utf-8" },
    ).then((response) => {
      console.log(response);
    });
  };
  value = () => {
    const des = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      "value"
    );
    Object.defineProperty(HTMLInputElement.prototype, "value", {
      get: function () {
        if (this.type === "text" && this.list) {
          var value = des.get.call(this);
          var opt = [].find.call(this.list.options, function (option) {
            return option.value === value;
          });
          return opt ? opt.dataset.value : value;
        }
      },
    });
  };
  render() {
    return (
      <div>
        <>
          <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="#home">Inventory</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link onClick={() => this.setState({ MAdd: true })}>
                Add
              </Nav.Link>
              <Nav.Link onClick={() => this.setState({ MKategori: true })}>
                Kategori
              </Nav.Link>
              <Nav.Link href="#pricing">Laporan</Nav.Link>
              <Nav.Link onClick={() => this.props.history.push("example")}>
                Laporan
              </Nav.Link>
            </Nav>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-light">Search</Button>
            </Form>
          </Navbar>
        </>
        <Contoh />
        <Container fluid>
          <Row>
            {this.state.data.map((data) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Card style={{ width: "18rem" }}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                      <Card.Title>Card Title</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </Card.Text>
                      <Button variant="primary">Go somewhere</Button>
                      <Button
                        variant="primary"
                        onClick={() => this.setState({ modal: true })}
                      >
                        Edit
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
          </Row>
        </Container>
        {/* Edit Produk */}
        <Modal
          show={this.state.modal}
          onHide={() => this.setState({ modal: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Produk</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <Form onSubmit={this.handleSubmit}>
                <InputGroup size="sm" className="mb-3">
                  <FormControl
                    placeholder="nama produk"
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    value={this.state.nama}
                    onChange={this.handleChangeName}
                  />
                  <FormControl
                    placeholder="jumlah produk"
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                  />
                </InputGroup>
                <InputGroup className="mb-3" size="sm">
                  <InputGroup.Prepend>
                    <InputGroup.Text>Pilih Kategori</InputGroup.Text>
                  </InputGroup.Prepend>
                  <select
                    style={{
                      backgroundColor: "#e9ecef",
                      border: "1px solid #ced4da",
                      borderRadius: ".25rem",
                    }}
                    title={this.state.kategori}
                    onChange={this.handleChange}
                  >
                    <option
                      style={{
                        height: "100px",
                        backgroundColor: "#e9ecef",
                        fontSize: "1rem",
                      }}
                      value="1"
                      href="#"
                    >
                      Kendaraan
                    </option>
                    <option value="2" href="#">
                      makanan
                    </option>
                  </select>
                </InputGroup>

                <input type="file" multiple={true} />
                <Button type="submit">Update</Button>
                <Button onClick={() => console.log(this.state.dataInput.nama)}>
                  Update
                </Button>
              </Form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.setState({ modal: false })}
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => console.log(this.state.data)}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Add Produk */}
        <>
          <Modal
            show={this.state.MAdd}
            onHide={() => this.setState({ MAdd: false })}
          >
            <Modal.Header closeButton>
              <Modal.Title>Tambah Produk</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <Form onSubmit={this.handleSubmitAdd}>
                  <input onChange={this.handleChangeName}></input>
                  <InputGroup size="sm" className="mb-3">
                    <FormControl
                      onChange={this.handleChangeName}
                      placeholder="nama produk"
                      aria-label="Small"
                      aria-describedby="inputGroup-sizing-sm"
                    />
                    <FormControl
                      onChange={this.handleChangeJumlahBarang}
                      placeholder="jumlah produk"
                      aria-label="Small"
                      aria-describedby="inputGroup-sizing-sm"
                    />
                  </InputGroup>
                  <InputGroup className="mb-3" size="sm"></InputGroup>

                  <input
                    type="file"
                    multiple={true}
                    onChange={this.handleChangeImage}
                  />
                  <Button type="submit">Tambah</Button>
                  <Button
                    onClick={() => console.log(this.state.dataInput.nama)}
                  >
                    Tambah
                  </Button>
                </Form>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => this.setState({ MAdd: false })}
              >
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => console.log(this.state.nama)}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>

        {/* modal kategori */}
        <>
          <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={this.state.MKategori}
          >
            <div>
              <Modal.Header
                closeButton
                onClick={() => this.setState({ MKategori: false })}
              >
                <Modal.Title id="contained-modal-title-vcenter">
                  Modal heading
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="masukan kategori"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    onChange={this.handleChangeKategori}
                  />
                  <InputGroup.Append>
                    <Button
                      variant="outline-secondary"
                      onClick={() => this.handleSubmitKategori()}
                    >
                      Tambah
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
                <App />
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={() => this.setState({ MKategori: false })}>
                  Close
                </Button>
              </Modal.Footer>
            </div>
          </Modal>
        </>
        <App />
        <input onChange={(value) => console.log(value.target.value)}></input>
        {/* <Contoh /> */}
      </div>
    );
  }
}

const App = (props) => {
  const [detail, setDetail] = useState({ food_id: "xyz" });

  const handleChange = (e) => {
    console.log(e.target.value);
    setDetail({ ...detail, [e.target.name]: e.target.value });
  };

  return (
    <div className="App">
      <h1>React HTML Datalist</h1>
      <p>
        <b>Selected food id:</b> {detail.food_id || "(none)"}
      </p>

      <small>Search or select in the datalist: </small>

      <ReactHTMLDatalist
        name={"food_id"}
        onChange={handleChange}
        classNames={"classone classtwo"}
        options={[
          { text: "Pizza", value: "1" },
          { text: "Burger", value: "2" },
          { text: "Sandwich", value: "3" },
          { text: "French Fries", value: "4" },
        ]}
      />
    </div>
  );
};
