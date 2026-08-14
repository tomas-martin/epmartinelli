import { Link } from 'react-router-dom';

interface BreadcrumbProps {
  title: string;
  current: string;
}

const Breadcrumb = ({ title, current }: BreadcrumbProps) => (
  <div
    className="breadcrumb-area bg-image"
    style={{ backgroundImage: 'linear-gradient(rgba(3,27,56,0.85),rgba(3,27,56,0.85))' }}
  >
    <div className="container">
      <div className="in-breadcrumb">
        <div className="row">
          <div className="col text-center">
            <h3>{title}</h3>
            <ul className="breadcrumb-list">
              <li className="breadcrumb-item">
                <Link to="/">Inicio</Link>
              </li>
              <li className="breadcrumb-item active">{current}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Breadcrumb;
