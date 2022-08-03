import { useState } from "react";
import getPhotoUrl from "get-photo-url";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../dexie";

const Gallery = () => {
  const allPhotos = useLiveQuery(() => db.gallery.reverse().toArray(), []);

  const addPhoto = async () => {
    db.gallery.add({
      url: await getPhotoUrl("#addPhotoInput"),
    });
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const removePhoto = (id) => {
    db.gallery.delete(id);
  };

  const removeAllPhoto = () => {
    db.gallery.clear();
  };

  const modal = (
    // The Modal
    <div class="modal">
      {/* Modal content */}
      <div class="modal-content">
        <div class="modal-header">
          <span class="close" onClick={() => setModalIsOpen(false)}>
            ×
          </span>
          <h2>Are you sure you want to delete all images?</h2>
        </div>
        <div class="modal-body">
          <button className="confirm-delete" onClick={() => removeAllPhoto()}>
            Yes
          </button>
          <button
            className="confirm-delete"
            onClick={() => setModalIsOpen(false)}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );

  const modalButton = (
    <button className="delete-all-button" onClick={() => setModalIsOpen(true)}>
      Delete All
    </button>
  );

  return (
    <>
      <input type="file" name="photo" id="addPhotoInput" />
      <label htmlFor="addPhotoInput" onClick={addPhoto}>
        <i className="add-photo-button fas fa-plus-square"></i>
      </label>

      {modalIsOpen ? modal : modalButton}

      <section className="gallery">
        {!allPhotos && <div className="loader"></div>}
        {!allPhotos?.length > 0 && (
          <div className="msg">You haven't added any Image</div>
        )}

        {allPhotos?.map((photo) => (
          <div className="item" key={photo.id}>
            <img src={photo.url} alt="" className="item-image" />
            {/* The Modal */}
            <button id="myBtn" className="delete-button">
              <a href="#myModal">Delete</a>
            </button>
            <div id="myModal" className="modal">
              {/* Modal content */}
              <div className="modal-content">
                <div className="modal-header">
                  <span className="close">
                    <a href="#close">×</a>
                  </span>
                  <h2>Are you sure you want to delete?</h2>
                </div>
                <div className="modal-body">
                  <button
                    className="confirm-delete"
                    onClick={() => removePhoto(photo.id)}
                  >
                    Yes
                  </button>
                  <button className="confirm-delete">
                    <a href="#close">No</a>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default Gallery;
