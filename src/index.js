import React from 'react';
import ReactDOM from 'react-dom';
import interact from 'interactjs'
import './index.scss';

class WenJuanXing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentElement: null
        };
    }

    initDraggable() {
        [1, 2].forEach(square => {
            this.initSingleDraggableElement(`square${square}`);
        });
    }

    initDropZone() {
        const self = this;

        interact('#container')
            .dropzone({
                accept: '#square1, #square2'
            })
            .on('dropactivate', function (event) {
                event.target.classList.add('drop-activated');
            })
            .on('dropdeactivate', function(event) {
                event.target.classList.remove('drop-activated');
            })
            .on('dragenter', function(event) {
                if (event.relatedTarget === self.state.currentElement.element) {
                    self.state.currentElement.state = 'dragenter';
                }
            })
            .on('dragleave', function(event) {
                if (event.relatedTarget === self.state.currentElement.element) {
                    self.state.currentElement.state = 'dragleave';
                }
            })
            .on('drop', function(event) {
                event.target.classList.remove('drop-activated');

                const targetElement = self.state.currentElement.element.cloneNode(true);
                targetElement.id = '';
                targetElement.style.transform = '';
                event.target.appendChild(targetElement);
                self.state.currentElement = null;
            });
    }

    initSingleDraggableElement(id) {
        const self = this;
        const position = { x: 0, y: 0 };

        interact(`#${id}`).draggable({
            listeners: {
                start (event) {
                    self.state.currentElement = {
                        element: event.target
                    };
                },
                move (event) {
                    position.x += event.dx
                    position.y += event.dy
            
                    event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
                },
                end (event) {
                    position.x = 0;
                    position.y = 0;

                    event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
                }
            }
        });
    }

    componentDidMount() {
        this.initDraggable();
        this.initDropZone();
    }

    render() {
        return (
            <div className="wrapper">
                <div id="container" className="line-right"></div>
                <div id="templates">
                    <div id="square1" className="square">1</div>
                    <div id="square2" className="square">2</div>
                </div>
            </div>
        );
    }
}
  
// ========================================

ReactDOM.render(
    <WenJuanXing />,
    document.getElementById('root')
);
  