import React, { Component, useState } from "react";
import Axios from "axios";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import "../../assets/style.css";
import {
  Card,
  Button,
  Navbar,
  Nav,
  Form,
  FormControl,
  Modal,
  InputGroup,
  Container,
  Row,
  Alert,
  Table,
} from "react-bootstrap";
import ReactHTMLDatalist from "react-html-datalist";
import { GrLogout } from "react-icons/gr";
import { IconContext } from "react-icons";
function searchFor(term) {
  return function (x) {
    // return x.first.toLowerCase().includes(term.toLowerCase()) || !term;
    console.log(x);
  };
}
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      Amodal: false,
      Umodal: false,
      Kmodal: false,
      Imodal: false,
      kategori: "",
      data: [],
      image: [],
      dataUpdate: [],
      listKategori: [],
      dummy: [
        {
          nama: "rohan",
          image: "",
        },
      ],
      term: "",
      images: [],
      KEmodal: false,
      dataKategoriUpdate: [],
    };
    this.ref = React.createRef();
  }

  componentDidMount = () => {
    console.log(localStorage.getItem("token"));
    const token = localStorage.getItem("token");
    if (token === null) {
      this.props.history.push("/");
    }
    this.setState({});
    this.getProduk();
    this.getKategori();
  };
  getProduk = () => {
    Axios.get("http://localhost:9876/api/v2/produk/list").then((response) => {
      console.log(response.data.result[0].image);
      this.setState({ data: response.data.result });
      // console.log(response.data.result);
    });
  };
  handleDeleteProduk = (id) => {
    console.log(id);
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.deleteProduk(id),
        },
        {
          label: "No",
        },
      ],
    });
  };
  deleteProduk = (id) => {
    console.log("ini adalah id yang akan dihapus", id);
    Axios.delete(`http://localhost:9876/api/v2/produk/delete/${id.id}`)
      .then(alert("delete success"), window.location.reload(false))

      .catch((error) => {
        console.log(error);
      });
  };
  getKategori = () => {
    Axios.get("http://localhost:9876/api/v2/kategori/kategori").then(
      (response) => {
        console.log(response.data.result);
        this.setState({ listKategori: response.data.result });
      }
    );
  };
  handleChangeName = (event) => {
    this.setState({ nama_barang: event.target.value });
  };
  handleChangeJumlahBarang = (event) => {
    console.log(event.target.value);
    this.setState({ jumlah_barang: event.target.value });
  };
  handleChangeKategori = (e) => {
    console.log(e.target.value);
    this.setState({ kategori: e.target.value });
  };

  handleChangeImage = (event) => {
    let files = event.target.files;
    this.setState({ image: files });
  };
  handleSubmitAddKategori = () => {
    Axios.post("http://localhost:9876/api/v2/kategori/insert", {
      nama_kategori: this.state.kategori,
    })
      .then(function (response) {
        console.log(response);
        window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  handleSubmitAddImage = async (event) => {
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    let form = new FormData();
    if (this.state.image.length <= 2) {
      alert("gambar tidak boleh kurang dari 3");
    } else {
      for (let i = 0; i < this.state.image.length; i++) {
        console.log(i);
        form.append(`image`, this.state.image[i]);
      }
    }

    Axios.post("http://localhost:9876/api/v2/produk/insert/image", form, config)
      .then(function (response) {
        console.log(response);
        window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  handleSubmitEditKategori = () => {
    Axios.patch(
      `http://localhost:9876/api/v2/kategori/update/${this.state.dataKategoriUpdate.value}`,
      { nama_kategori: this.state.kategori }
    )
      .then((response) => {
        console.log(response);
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleSubmitEdit = () => {
    const { nama_barang, jumlah_barang, kategori } = this.state;
    if (
      nama_barang === undefined ||
      jumlah_barang === undefined ||
      kategori === 0
    ) {
      alert("tidak boleh ada yang di kosongkan");
    } else {
      const id = this.state.dataUpdate.id_produk;
      console.log(this.state.dataUpdate.id_produk);
      Axios.patch(`http://localhost:9876/api/v2/produk/update/${id}`, {
        nama_produk: nama_barang,
        id_kategori: kategori,
        jumlah_barang: jumlah_barang,
      })
        .then((response) => {
          console.log(response);
          this.handleSubmitEditImage();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  handleSubmitEditImage = () => {
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const id = this.state.dataUpdate.id_produk;
    const { image } = this.state.dataUpdate;
    let form = new FormData();
    if (this.state.image.length <= 2) {
      alert("gambar tidak boleh kurang dari 3");
    } else {
      for (let i = 0; i < this.state.image.length; i++) {
        console.log(i);
        form.append(`image`, this.state.image[i]);
        form.append(`id_produk`, id);
      }
    }

    Axios.post("http://localhost:9876/api/v2/produk/insert/image", form, config)
      .then(function (response) {
        console.log(response);
        window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error);
      });
    let id_img;
    for (let index = 0; index < image.length; index++) {
      console.log(image[index].id);
      id_img = [image[index].id];
      Axios.delete(`http://localhost:9876/api/v2/image/delete/${id_img}`).then(
        (response) => {
          console.log(response);
        }
      );
    }
    console.log("ini adalah id gambar", id_img);

    // for (let index = 0; index < array.length; index++) {
    //   const element = array[index];
    // }
  };
  handleSubmitAddProduk = () => {
    const { nama_barang, jumlah_barang, kategori } = this.state;
    if (nama_barang === undefined) {
      alert("nama produk tidak boleh kosong");
    } else if (jumlah_barang === undefined) {
      alert("jumlah barang tidak boleh kosong");
    } else {
      console.log("halo");
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      let form = new FormData();
      form.append("nama_produk", nama_barang);
      form.append("jumlah_barang", jumlah_barang);
      form.append("id_kategori", kategori);
      Axios.post("http://localhost:9876/api/v2/produk/insert", form, config)
        .then((response) => {
          console.log(response);
          this.handleSubmitAddImage();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  Open = (data) => {
    console.log(data);
    data.image.forEach((img) => {
      console.log(img.id);
    });
    this.setState({ Umodal: true, dataUpdate: data });
  };
  KUmodal = (data) => {
    console.log(data);
    this.setState({ KEmodal: true, dataKategoriUpdate: data });
  };

  handleSearch = (event) => {
    this.setState({ term: event.target.value });
  };
  searchFor = (term) => {
    return term.nama_produk.indexOf(this.state.term) !== -1;
  };
  Imodal = (data) => {
    console.log(data.image);
    this.setState({ Imodal: true, images: data.image });
  };
  handleLogout = () => {
    localStorage.clear("token");
    this.props.history.push("/");
  };
  handleTest = () => {
    const id = this.state.dataUpdate.image;
    console.log(this.state.image);
    const { image } = this.state.dataUpdate;
    console.log(image);
    id.map((id) => {
      console.log(id.image);
    });
  };
  render() {
    var { kategori } = this.state;
    let files = [];
    const properties = {
      duration: 5000,
      transitionDuration: 500,
      infinite: true,
      indicators: true,
      arrows: true,
      pauseOnHover: true,
      onChange: (oldIndex, newIndex) => {
        console.log(`slide transition from ${oldIndex} to ${newIndex}`);
      },
    };
    return (
      <div ref={this.ref}>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="#home">Inventory</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link onClick={() => this.setState({ Amodal: true })}>
              Add
            </Nav.Link>
            <Nav.Link onClick={() => this.setState({ Kmodal: true })}>
              Kategori
            </Nav.Link>
            <Nav.Link onClick={() => this.props.history.push("laporan")}>
              Laporan
            </Nav.Link>
            <input
              type="text"
              className="bajingan"
              onChange={this.handleSearch}
              name="search"
              placeholder="Search"
            />
          </Nav>
          <Button variant="danger" onClick={() => this.handleLogout()}>
            <IconContext.Provider
              value={{ color: "white", className: "global-class-name" }}
            >
              <div>
                <GrLogout color="white" />
              </div>
            </IconContext.Provider>
          </Button>
        </Navbar>

        {/* Card */}
        <Container>
          <div>
            <h1 style={{ textAlign: "center", margin: "50px" }}>
              List Data Produk
            </h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Nama Barang</th>
                  <th>Gambar</th>
                  <th>Jenis Kategori</th>
                  <th>Jumlah Barang</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data
                  .filter((data) => this.searchFor(data))
                  .map((data) => {
                    console.log(data.image[0].image);
                    return (
                      <tr style={{ textAlign: "center" }}>
                        <td>{data.nama_produk}</td>
                        <td>
                          <img
                            alt="img"
                            width="100px"
                            src={data.image[0].image}
                            onClick={() => this.Imodal({ image: data.image })}
                          ></img>
                        </td>
                        <td>{data.nama_kategori}</td>
                        <td>{data.jumlah_barang}</td>
                        <td>
                          <Button
                            variant="primary"
                            onClick={() => this.Open(data)}
                          >
                            Edit Produk
                          </Button>
                          &nbsp;
                          <Button
                            variant="danger"
                            onClick={() =>
                              this.handleDeleteProduk({
                                id: data.id_produk,
                              })
                            }
                          >
                            Hapus Produk
                          </Button>
                        </td>
                      </tr>

                      // <div
                      //   style={{
                      //     display: "flex",
                      //     flexDirection: "row",
                      //   }}
                      // >
                      //   <Card style={{ width: "18rem", margin: "10px" }}>
                      //     <Card.Img
                      //       variant="top"
                      //       src={data.image[0]}
                      //       style={{ height: "220px" }}
                      //       onClick={() => this.Imodal({ image: data.image })}
                      //     />
                      //     <Card.Body>
                      //       <Card.Title>{data.nama_produk}</Card.Title>
                      //       <Card.Text>
                      //         jumlah barang : {data.jumlah_barang}
                      //       </Card.Text>
                      // <Button
                      //   variant="primary"
                      //   onClick={() => this.Open(data)}
                      // >
                      //   Edit Produk
                      // </Button>
                      //       &nbsp;
                      // <Button
                      //   variant="danger"
                      //   onClick={() =>
                      //     this.handleDeleteProduk({
                      //       id: data.id_produk,
                      //     })
                      //   }
                      // >
                      //   Hapus Produk
                      // </Button>
                      //     </Card.Body>
                      //   </Card>
                      // </div>
                    );
                  })}
              </tbody>
            </Table>
          </div>
        </Container>

        {/* Add Modal */}
        {/* <Modal
          show={this.state.Amodal}
          onHide={() => this.setState({ Amodal: false })}
          backdrop="static"
          keyboard={false}
        > */}
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.Amodal}
        >
          <Modal.Header
            closeButton
            onClick={() => this.setState({ Amodal: false })}
          >
            <Modal.Title>Tambah Produk</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <Form>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="nama produk"
                    aria-label="small"
                    aria-describedby="basic-addon2"
                    onChange={this.handleChangeName}
                  />
                  <FormControl
                    onChange={this.handleChangeJumlahBarang}
                    placeholder="jumlah produk"
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                  />
                </InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>Pilih Kategori</InputGroup.Text>
                  <ReactHTMLDatalist
                    name={"list_kategori"}
                    onChange={this.handleChangeKategori}
                    classNames={"classone classtwo"}
                    options={this.state.listKategori}
                  />
                </InputGroup.Prepend>
                <br />
                <input type="file" multiple onChange={this.handleChangeImage} />
              </Form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.setState({ Amodal: false })}
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => this.handleSubmitAddProduk()}
            >
              Add
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Add Modal End */}
        {/* Edit Modal */}
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.Umodal}
        >
          <Modal.Header
            closeButton
            onClick={() => this.setState({ Umodal: false })}
          >
            <Modal.Title>Edit Produk</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <Form>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder={this.state.dataUpdate.nama_produk}
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    onChange={this.handleChangeName}
                  />
                  <FormControl
                    placeholder={this.state.dataUpdate.jumlah_barang}
                    type="number"
                    onChange={this.handleChangeJumlahBarang}
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                  />
                </InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>Pilih Kategori</InputGroup.Text>
                  <ReactHTMLDatalist
                    name={"list_kategori"}
                    onChange={this.handleChangeKategori}
                    classNames={"classone classtwo"}
                    options={this.state.listKategori}
                  />
                </InputGroup.Prepend>
                <br />
                <input
                  type="file"
                  multiple={true}
                  onChange={this.handleChangeImage}
                />
              </Form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.setState({ Umodal: false })}
            >
              Close
            </Button>
            <Button variant="primary" onClick={() => this.handleSubmitEdit()}>
              Edit
            </Button>
            <Button variant="primary" onClick={() => this.handleTest()}>
              Test
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Kategori Modal */}
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.Kmodal}
        >
          <div>
            <Modal.Header
              closeButton
              onClick={() => this.setState({ Kmodal: false })}
            >
              <Modal.Title id="contained-modal-title-vcenter">
                Kategori Area
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Nama Kategori</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.listKategori.map((kategori) => {
                    return (
                      <tr>
                        <td>{kategori.text} </td>
                        <td>
                          <Button onClick={() => this.KUmodal(kategori)}>
                            Edit
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <h5>Tambah Kategori</h5>
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
                    onClick={() => this.handleSubmitAddKategori()}
                  >
                    Tambah
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => this.setState({ Kmodal: false })}>
                Close
              </Button>
            </Modal.Footer>
          </div>
        </Modal>
        {/* Kategori Modal End */}
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.Imodal}
        >
          <div>
            <Modal.Header
              closeButton
              onClick={() => this.setState({ Imodal: false })}
            >
              <Modal.Title id="contained-modal-title-vcenter">
                Gambar
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="slide-container">
                <Slide {...properties}>
                  {this.state.images.map((image) => {
                    return (
                      <div className="each-slide">
                        <div
                          style={{
                            height: "500px",
                            display: "flex",
                          }}
                        >
                          <img
                            alt="image"
                            src={image.image}
                            style={{ margin: "auto", width: "500px" }}
                          ></img>
                        </div>
                      </div>
                    );
                  })}
                </Slide>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => this.setState({ Imodal: false })}>
                Close
              </Button>
            </Modal.Footer>
          </div>
        </Modal>

        {/* Modal Edit Kategori */}
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.KEmodal}
        >
          <div>
            <Modal.Header
              closeButton
              onClick={() => this.setState({ KEmodal: false })}
            >
              <Modal.Title id="contained-modal-title-vcenter">
                Edit Kategori
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder={this.state.dataKategoriUpdate.text}
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  onChange={this.handleChangeKategori}
                />
                <InputGroup.Append>
                  <Button
                    variant="outline-secondary"
                    onClick={() => this.handleSubmitEditKategori()}
                  >
                    Edit
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => this.setState({ KEmodal: false })}>
                Close
              </Button>
            </Modal.Footer>
          </div>
        </Modal>
      </div>
    );
  }
}
const App = (props) => {
  const [detail, setDetail] = useState({ kategori: "xyz" });

  const handleChange = (e) => {
    console.log(e.target.value);
    setDetail({ ...detail, [e.target.name]: e.target.value });
  };

  return (
    <div className="App">
      <h1>React HTML Datalist</h1>
      <p>
        <b>Selected food id:</b> {detail.kategori || "(none)"}
      </p>

      <small>Search or select in the datalist: </small>

      <ReactHTMLDatalist
        name={"kategori"}
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
