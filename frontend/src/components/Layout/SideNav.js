import { useNavigate, useLocation } from 'react-router-dom';

import { routes } from '../../routes';

function SideNav({ show = false }) {
  const navigate = useNavigate();
  const location = useLocation();

  if (!show) {
    return null;
  }

  const sections = [
    {
      name: 'Home',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
          <path d="M4.7 20.35V9.4L12 3.9l7.3 5.5v10.95H13v-6.1h-2v6.1ZM6.05 19h3.6v-6.1h4.7V19h3.6v-8.9L12 5.6l-5.95 4.5ZM12 12.3Z" />
        </svg>
      ),
      path: routes.DASHBOARD.path,
    },
    {
      name: 'Montly overview',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
          <path
            d="M7.9 13.9q-.325 0-.588-.263-.262-.262-.262-.587 0-.325.262-.588.263-.262.588-.262.325 0
          .588.262.262.263.262.588 0 .325-.262.587-.263.263-.588.263Zm4.1 0q-.325 0-.587-.263-.263-.262-.263-.587
          0-.325.263-.588.262-.262.587-.262.325 0 .588.262.262.263.262.588 0 .325-.262.587-.263.263-.588.263Zm4.1
          0q-.325 0-.588-.263-.262-.262-.262-.587 0-.325.262-.588.263-.262.588-.262.325 0 .588.262.262.263.262.588
          0 .325-.262.587-.263.263-.588.263ZM5.65 21.45q-.925 0-1.537-.613Q3.5 20.225 3.5
          19.3V6.6q0-.925.613-1.538.612-.612 1.537-.612h1.2v-2.2H8.3v2.2h7.5v-2.2h1.35v2.2h1.2q.925 0
          1.538.612.612.613.612 1.538v12.7q0 .925-.612 1.537-.613.613-1.538.613Zm0-1.35h12.7q.3 0
          .55-.25.25-.25.25-.55v-9H4.85v9q0
          .3.25.55.25.25.55.25Zm-.8-11.15h14.3V6.6q0-.3-.25-.55-.25-.25-.55-.25H5.65q-.3 0-.55.25-.25.25-.25.55Zm0 0V5.8 8.95Z"
          />
        </svg>
      ),
      path: routes.MONTHLY_OVERVIEW.path,
    },
    {
      name: 'Manage Transactions',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
          <path
            d="
            M11.35 18.85h1.25v-1.2q1.175-.175 2.138-.862.962-.688.962-2.188
            0-1.1-.625-1.875-.625-.775-2.475-1.425-1.675-.6-2.162-1-.488-.4-.488-1.15
            0-.725.575-1.213.575-.487
            1.525-.487.775 0 1.262.375.488.375.788.925l1.15-.45q-.325-.775-1.025-1.338-.7-.562-1.575-.612v-1.2H11.4v1.2q-1.325.225-2.012
            1.025-.688.8-.688 1.775 0 1.125.7 1.825t2.3 1.275q1.625.6 2.213 1.062.587.463.587
            1.288 0 1.025-.738 1.462-.737.438-1.612.438-.875 0-1.575-.512-.7-.513-1.075-1.488l-1.15.45q.4
            1.125 1.162 1.762.763.638 1.838.888ZM12 21.5q-1.975 0-3.7-.75t-3.013-2.038Q4 17.425
            3.25 15.7T2.5 12q0-1.975.75-3.713Q4 6.55 5.287 5.262 6.575 3.975 8.3 3.237 10.025
            2.5 12 2.5t3.713.737q1.737.738 3.025 2.025 1.287 1.288 2.025 3.025.737 1.738.737
            3.713t-.737 3.7q-.738 1.725-2.025 3.012Q17.45 20 15.713 20.75q-1.738.75-3.713.75Zm0-1.35q3.425
            0 5.788-2.363Q20.15 15.425 20.15 12t-2.362-5.788Q15.425 3.85 12 3.85q-3.425 0-5.787
            2.362Q3.85 8.575 3.85 12q0 3.425 2.363 5.787Q8.575 20.15 12 20.15ZM12 12Z"
          />
        </svg>
      ),
      path: routes.MANAGE_TRANSACTIONS.path,
    },
    {
      name: 'Manage categories',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
          <path
            d="m7.45 10.8 4.65-7.65 4.65 7.65ZM17.7 22.1q-1.725 0-2.888-1.2-1.162-1.2-1.162-2.95
            0-1.725 1.162-2.888Q15.975 13.9 17.7 13.9q1.75 0 2.95 1.162 1.2 1.163 1.2 2.888 0 1.75-1.2 2.95-1.2 1.2-2.95
            1.2Zm-14.25-.6v-7.1h7.1v7.1Zm14.25-.75q1.15 0 1.975-.8.825-.8.825-1.95t-.825-1.95q-.825-.8-1.975-.8-1.15 0-1.925.8Q15
            16.85 15 18t.775 1.95q.775.8 1.925.8Zm-12.9-.6h4.4v-4.4H4.8Zm5.05-10.7h4.55L12.1 5.8Zm2.275 0ZM9.2 15.75ZM17.75 18Z"
          />
        </svg>
      ),
      path: routes.MANAGE_CATEGORIES.path,
    },
  ];

  return (
    <div className="w-80 bg-white pr-1 mt-2">
      <ul>
        {sections.map(({ name, icon, path }) => (
          <li className="relative" key={name}>
            <a
              href={path}
              onClick={(e) => {
                e.preventDefault();
                navigate(path);
              }}
              className={
                'block flex w-full hover:bg-slate-100 rounded-r-xl text-sm pl-5 py-2 text-left space-x-2' +
                (path === location.pathname
                  ? ' bg-blue-100 hover:bg-blue-100'
                  : '')
              }
            >
              <span className="text-blue-600">{icon}</span>
              <span className="leading-[24px]">{name}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideNav;