import React, { useEffect, useState, useCallback } from 'react';
import supabase from '../../supabase';
import OrderCard from '../Order/components/orderCard';
import FormProfile from './formProfile';

const ProfilePage = () => {
  const [profile, setProfile] = useState({});
  const [orders, setOrders] = useState([])

  const getProfile = useCallback(async () => {
    const profile_id = parseInt(window.location.pathname.split("/")[3]);
    let { data: profileData, error } = await supabase
      .from('profile_horsesadle')
      .select("*")
      .eq('id', profile_id);

    if (error) {
      console.error("Error fetching profile:", error.message);
      return;
    }

    if (profileData && profileData.length > 0) {
      setProfile(profileData[0]);
      getOrders(profileData[0].id)
    } else {
      console.warn("Profile not found");
    }
  }, []);

  const getOrders = useCallback(async (profile_id) => {
    let { data: usersOrders, error } = await supabase
      .from('order_horsesaddle')
      .select("*")
      .eq('profile_horsesadle_id', profile_id);

    if (error) {
      console.error("Error fetching profile:", error.message);
      return;
    }

    if (usersOrders && usersOrders.length > 0) {
      setOrders(usersOrders);
    } else {
      console.warn("Profile not found");
    }
  }, []);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 text-center'>
          <h5 className='text-center my-5'>Orders</h5>
          { orders.length > 0 && orders.map(order => { return <OrderCard key={order.id} order={order} />})}
        </div>
        <div className='col-md-6'>
          <h3 className='text-center my-5'>Profile Info</h3>
          {profile.full_name ? (
            <FormProfile profile={profile} />
          ) : (
            <p>Loading profile information...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
