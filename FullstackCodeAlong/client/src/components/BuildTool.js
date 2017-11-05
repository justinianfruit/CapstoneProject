import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ChromePicker } from 'react-color';

class BuildTool extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.setFont = this.setFont.bind(this);
        this.openBackColors = this.openBackColors.bind(this);
        this.openTextColors = this.openTextColors.bind(this);
        this.changeBackground = this.changeBackground.bind(this);
        this.changeText = this.changeText.bind(this);
        this.state = {
            title: "Product Title",
            background: "#FFF",
            foreground: "#000"
        };
    }

    handleChange(e) {
        this.setState({ title: e.target.value });
        document.getElementById('cardTitle').innerHTML = this.state.title;
    }

    setFont() {
        let listValue = document.getElementById('fontBox').value;
        let general = "";
        if (listValue === "Alegreya Sans SC") {
            general = "sans-serif";
        } else {
            general = "cursive";
        }
        document.getElementById("cardTitle").style.fontFamily = listValue + "," + general;
    }

    openBackColors() {
        var one = document.getElementById('backColor');
        var two = document.getElementById('backgroundPicker');
        var rect = one.getBoundingClientRect();
        two.style.top = rect.top + "px";
        two.style.left = rect.left + "px";
        document.getElementById('backgroundPicker').style.display = 'block';
    }

    openTextColors() {
        var one = document.getElementById('textColor');
        var two = document.getElementById('textPicker');
        var rect = one.getBoundingClientRect();
        two.style.top = rect.top + "px";
        two.style.left = rect.left + "px";
        document.getElementById('textPicker').style.display = 'block';
    }

    changeBackground = (color) => {
        this.setState({ background: color.hex });
        document.getElementById('card').style.background = this.state.background;
        document.getElementById('backColor').style.background = this.state.background;
        document.getElementById('backgroundPicker').style.display = 'none';
    };

    changeText = (color) => {
        this.setState({ foreground: color.hex });
        document.getElementById('cardTitle').style.color = this.state.foreground;
        document.getElementById('textColor').style.background = this.state.foreground;
        document.getElementById('textPicker').style.display = 'none';
    };

    render() {
        return (
            <div>
                <div className="row">
                    <div className="container-large">
                        <div className="col col-10 center">
                            <h1>Wire Framing Tool</h1>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="container-full tools">
                        <div className="col col-2 antiLeft toolbarL">
                            <a>File</a>
                            <a>Edit</a>
                            <a>View</a>
                        </div>
                        <div className="col col-6"></div>
                        <div className="col col-2 antiRight toolbarR">
                            <a>History</a>
                            <a>Save</a>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="container-full">
                        <div className="col col-2 antiLeft interact">
                            <form className="item2">
                                <p>Title: &nbsp;</p><input value={this.state.title} onChange={this.handleChange}/>
                            </form>
                            <div className="item2">
                                <p>Background Color: &nbsp;</p><div id="backColor" onClick={this.openBackColors}></div>
                            </div>
                            <div id="backgroundPicker">
                                <ChromePicker color={this.state.background} onChangeComplete={this.changeBackground} />
                            </div>
                            <div className="item2">
                                <p>Text Color: &nbsp;</p><div id="textColor" onClick={this.openTextColors}></div>
                            </div>
                            <div className="item2" id="textPicker">
                                <ChromePicker color={this.state.foreground} onChangeComplete={this.changeText} />
                            </div>
                            <p>Font: </p><select className="item2" id="fontBox" onChange={this.setFont}>
                                <option>Abril Fatface</option>
                                <option selected>Alegreya Sans SC</option>
                                <option>Audiowide</option>
                                <option>Baloo Bhaijaan</option>
                                <option>Comfortaa</option>
                                <option>Lobster</option>
                                <option>Patua One</option>
                                <option>Righteous</option>
                                <option>Shrikhand</option>
                                <option>Special Elite</option>
                            </select>
                        </div>
                        <div className="col col-8 antiRight" id="card">
                            <h1 id="cardTitle" className="center">{this.state.title}</h1>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(BuildTool);