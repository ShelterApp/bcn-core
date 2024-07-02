'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

(function (ScheduleType) {
    ScheduleType["Weekly"] = "WEEKLY";
    ScheduleType["Monthly"] = "MONTHLY";
    ScheduleType["DateRange"] = "DATE_RANGE";
    ScheduleType["FullDay"] = "FULL_DAY";
    ScheduleType["PermanentlyClosed"] = "PERMANENTLY_CLOSED";
})(exports.ScheduleType || (exports.ScheduleType = {}));

(function (ServiceType) {
    ServiceType["Food"] = "FOOD";
    ServiceType["Shelter"] = "SHELTER";
    ServiceType["Health"] = "HEALTH";
    ServiceType["Resources"] = "RESOURCES";
    ServiceType["Education"] = "EDUCATION";
})(exports.ServiceType || (exports.ServiceType = {}));

(function (ScheduleCategory) {
    ScheduleCategory["Men"] = "MEN";
    ScheduleCategory["Women"] = "WOMEN";
    ScheduleCategory["Kids"] = "KIDS";
    ScheduleCategory["Seniors"] = "SENIORS";
    ScheduleCategory["Disabled"] = "DISABLED";
    ScheduleCategory["Families"] = "FAMILIES";
    ScheduleCategory["Lgbt"] = "LGBT";
    ScheduleCategory["All"] = "ALL";
})(exports.ScheduleCategory || (exports.ScheduleCategory = {}));

(function (MonthPeriod) {
    MonthPeriod["First"] = "FIRST";
    MonthPeriod["Second"] = "SECOND";
    MonthPeriod["Third"] = "THIRD";
    MonthPeriod["Fourth"] = "FOURTH";
    MonthPeriod["Fifth"] = "FIFTH";
    MonthPeriod["Last"] = "LAST";
})(exports.MonthPeriod || (exports.MonthPeriod = {}));

(function (DayPeriod) {
    DayPeriod["Monday"] = "MONDAY";
    DayPeriod["Tuesday"] = "TUESDAY";
    DayPeriod["Wednesday"] = "WEDNESDAY";
    DayPeriod["Thursday"] = "THURSDAY";
    DayPeriod["Friday"] = "FRIDAY";
    DayPeriod["Saturday"] = "SATURDAY";
    DayPeriod["Sunday"] = "SUNDAY";
})(exports.DayPeriod || (exports.DayPeriod = {}));

(function (UserRole) {
    UserRole["User"] = "USER";
    UserRole["Administrator"] = "ADMINISTRATOR";
    UserRole["SupperUser"] = "SUPER USER";
    UserRole["AutoUser"] = "AUTO USER";
    UserRole["Default"] = "USER";
})(exports.UserRole || (exports.UserRole = {}));

(function (RequestPasswordType) {
    RequestPasswordType["Web"] = "WEB";
    RequestPasswordType["Mobile"] = "MOBILE";
    RequestPasswordType["Default"] = "WEB";
})(exports.RequestPasswordType || (exports.RequestPasswordType = {}));

(function (AccountProvider) {
    AccountProvider["Local"] = "LOCAL";
    AccountProvider["Facebook"] = "FACEBOOK";
    AccountProvider["Google"] = "GOOGLE";
    AccountProvider["Instagram"] = "INSTAGRAM";
    AccountProvider["Twitter"] = "TWITTER";
    AccountProvider["Default"] = "LOCAL";
})(exports.AccountProvider || (exports.AccountProvider = {}));

(function (PushPlatform) {
    PushPlatform["Ios"] = "IOS";
    PushPlatform["Android"] = "ANDROID";
    PushPlatform["Web"] = "WEB";
})(exports.PushPlatform || (exports.PushPlatform = {}));

(function (FeedbackType) {
    FeedbackType["Service"] = "SERVICE";
    FeedbackType["App"] = "APP";
    FeedbackType["Claim"] = "CLAIM";
})(exports.FeedbackType || (exports.FeedbackType = {}));

(function (RegionType) {
    RegionType["StateWide"] = "Statewide";
    RegionType["Region1"] = "Region 1";
    RegionType["Region2"] = "Region 2";
    RegionType["Region3"] = "Region 3";
    RegionType["Region4"] = "Region 4";
    RegionType["Region5"] = "Region 5";
    RegionType["Region6"] = "Region 6";
    RegionType["Region7"] = "Region 7";
    RegionType["Region8"] = "Region 8";
})(exports.RegionType || (exports.RegionType = {}));
//# sourceMappingURL=index.js.map
