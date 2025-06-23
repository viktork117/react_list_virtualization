import { memo, type FC } from 'react';

import { ListItems } from '@/components';

const Main: FC = () => (
  <div>
    <ListItems />
  </div>
);

export default memo(Main);
