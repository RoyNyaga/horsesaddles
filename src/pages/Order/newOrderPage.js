import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import supabase from '../../supabase';
import Form from './components/form';

const NewOrderPage = () => {
  const products = useSelector((state) => state.orebiReducer.products);
  const [profile, setProfile] = useState({});
 

  const product_ids = products.map((p) => { return `${p._id}-${p.quantity}`})
  const getProfile = useCallback(async (user) => {
    let { data: profileData, error } = await supabase
      .from('profile_horsesadle')
      .select("*")
      .eq('user_id', user.id);

    if (error) {
      console.error("Error fetching profile:", error.message);
      return;
    }

    if (profileData && profileData.length > 0) {
      setProfile(profileData[0]);
    } else {
      console.warn("Profile not found");
    }
  }, []);
  // Memoize getProfileFromUser to prevent re-creation on every render
  const getProfileFromUser = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      getProfile(user);
    }
  }, [getProfile]);

 

  useEffect(() => {
    getProfileFromUser()
  }, [getProfileFromUser])


  return (
    <div className='container'>
      <div className='row my-5'>
        <div className='col-md-6 mx-auto'>
          {profile.full_name && <Form profile={profile} product_ids={product_ids} />}
        </div>
      </div>
    </div>
  )
}

export default NewOrderPage;
