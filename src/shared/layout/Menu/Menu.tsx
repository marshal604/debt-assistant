import React, { FunctionComponent, useContext } from 'react';
import { Link } from 'react-router-dom';

import { MenuProps } from './Menu.model';
import MenuContext from './Menu.context';
import { MenuHoc } from './MenuHOC';
import './Menu.scss';
const Menu: FunctionComponent<MenuProps> = props => {
  const context = useContext(MenuContext);
  return (
    <div className={['Menu', props.opened ? 'Menu--opened' : ''].join(' ')}>
      <div className="Menu__List">
        {props.brandUrl ? (
          <div className="Menu__Brand">
            <img src={props.brandUrl} alt="brand" />
          </div>
        ) : null}

        {props.list.map(item => (
          <React.Fragment key={item.link}>
            <Link to={item.link} className="yur-text-decoration-none" onClick={() => context.close()}>
              <div className="Menu__Item">
                {item.iconCls ? <i className={[item.iconCls, 'mr-1'].join(' ')}></i> : null}
                <div>{item.title}</div>
              </div>
            </Link>
            {item.divider ? <hr className="my-1"></hr> : null}
          </React.Fragment>
        ))}
      </div>
      <div className="Menu__Backdrop" onClick={() => context.close()}></div>
    </div>
  );
};
const MenuContainer = MenuHoc(Menu);
export default MenuContainer;
