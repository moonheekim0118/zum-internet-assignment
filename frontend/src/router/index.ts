import { Component,Router } from '@/core';
import { Home } from '@/pages';

import { PATH } from '@/constants';

type IPage={
    [pathname in PATH]: Component
}

const router = new Router<IPage>({
    [PATH.HOME]: new Home,
    [PATH.CATEGORY]:new Home,
    [PATH.BOOKMARK]:new Home,
    [PATH.DETAIL]:new Home,
});

export default router;