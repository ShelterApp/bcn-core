enum PushPlatform {
  Ios = 'IOS',
  Android = 'ANDROID',
  Web = 'WEB',
}

interface Push {
  readonly platform?: string;
  readonly token?: string;
  readonly deviceId?: string;
}

export {
  PushPlatform,
  Push,
};
