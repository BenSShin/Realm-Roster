/* eslint-disable react/prop-types */
import "./Modal.css";

export function Modal(props) {
  if (props.show) {
    return (
      <div className="modal-background">
        <section className="modal-main bg-[#FCF5ED] border-[5px] border-[#CE5A67] rounded-md h-[50%]">
          {props.children}
          <button className="close mt-3 mr-6" type="button" onClick={props.onClose}>
            &#x2715;
          </button>
        </section>
      </div>
    );
  }
}
