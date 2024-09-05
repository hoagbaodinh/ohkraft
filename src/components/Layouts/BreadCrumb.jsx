import { NavLink } from "react-router-dom";

const BreadCrumb = (props) => {
  let currentLink = "";
  const crumbs = props.URL.split("/").map((crumb) => {
    if (crumb) currentLink = `/${crumb}`;
    if (currentLink === "") return null;
    return (
      <li className="breadcrumb-item " key={crumb}>
        <NavLink
          to={currentLink}
          className={({ isActive }) => (isActive ? "activeCrumb" : undefined)}
          end
        >
          {crumb}
        </NavLink>
      </li>
    );
  });

  return (
    <section className="breadcrumbs">
      <div className="container">
        <div className="breadcrumbContainer">
          <span className="crumbTitle">{props.title}</span>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">{crumbs}</ol>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default BreadCrumb;
