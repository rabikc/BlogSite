import React from "react";
import { Link } from "react-router-dom";

import MoreContent from "./MoreContent";

const Sidebar = ({ user, setLoading }) => {
  const userLink = `/users/${user.id}/${user.username}`;

  return (
    <aside className="single-blog-sidebar">
      {!user && (
        <div className="get-started">
          <Link to="/sign-up" className="get-started-link">
            Get Started
          </Link>
          <Link to="/sign-in" className="sign-in-link">
            Sign in
          </Link>
        </div>
      )}

      {user && (
        <div className="sidebar-user-detail">
          <div className="details-top">
            <Link to={userLink} className="profile-img">
              <img src={user.profileImg} alt={user.name} />
            </Link>
            <Link to={userLink} className="username">
              {user.name}
            </Link>
            <span>{user.followers} Followers</span>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            qui molestiae cupiditate esse. Ad qui nisi ut blanditiis totam cum.
          </p>
          <a href="https://www.google.com">{user.website}</a>
        </div>
      )}
      <MoreContent setLoading={setLoading} />
    </aside>
  );
};

export default Sidebar;
