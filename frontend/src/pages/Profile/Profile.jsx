import React from 'react';
import Title from '~/components/Title/Title';
import UserInfo from './Info/UserInfo';

const Profile = ({ title }) => {
    return (
        <Title title={title}>
            <UserInfo />;
        </Title>
    );
};

export default Profile;
