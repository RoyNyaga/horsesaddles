import React, { useState } from 'react'
import supabase from '../../../supabase';

const AddPhotoForm = ({ updateProduct }) => {
  const [loading, setLoading] = useState(false)

  const generateRandomStrings = () => {
    const randomStrings = [];

    for (let i = 0; i < 10; i++) {
      let randomString = '';

      for (let j = 0; j < 10; j++) {  // Generating a string of 10 random digits
        randomString += Math.floor(Math.random() * 10);  // Generates a random digit (0-9)
      }

      randomStrings.push(randomString);
    }

    return randomStrings;
  }

  const handleSubmitPhotoForm = async (event) => {
    event.preventDefault();
    setLoading(true)

    const photoInputField = document.querySelector("#photo-input")
    const productPhoto = photoInputField.files[0]
    const photoName = productPhoto.name + "-" + generateRandomStrings()

    const { data: photoObject, error } = await supabase
      .storage
      .from('general-ideas')
      .upload(`public/${photoName}`, productPhoto, {
        cacheControl: '3600',
        upsert: false
      })

    if (!error) {
      const { data: publicUrl } = supabase
        .storage
        .from('general-ideas')
        .getPublicUrl(`public/${photoName}`)
      console.log("this is publicUrl", publicUrl.publicUrl)
      updateProduct(publicUrl.publicUrl, photoObject.id)
      photoInputField.value = ""
      setLoading(false)

    } else {
      console.log(error)
    }
  }
  return (
    <form onSubmit={handleSubmitPhotoForm}>
      <input type="file" name="photo" id="photo-input" />
      {loading &&
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      }
      <br />
      <br />

      {!loading && <button className='btn btn-primary' id="photo-save-btn">Save Changes</button>}
    </form>
  )
}

export default AddPhotoForm;
