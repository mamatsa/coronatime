export type Country = {
  code: string;
  name: { en: string; ka: 'string' };
  statistics: {
    confirmed: number;
    recovered: number;
    critical: number;
    deaths: number;
  };
  _id: 'string';
};

export type Statistics = {
  confirmed: number;
  recovered: number;
  deaths: number;
};

export type Sidebar = {
  username: string | null;
  onLogout: () => void;
  onSidebarClose: () => void;
};

export type DashboardProps = {
  username: string | null;
  token: string;
  onLogout: () => void;
};

export type NavbarComponent = { username: string | null; onLogout: () => void };
