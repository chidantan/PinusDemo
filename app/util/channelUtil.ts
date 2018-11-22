
export module channelUtil{

  var GLOBAL_CHANNEL_NAME = 'egme';
  var AREA_CHANNEL_PREFIX = 'area_';
  var TEAM_CHANNEL_PREFIX = 'team_';

  export function getGlobalChannelName() {
    return GLOBAL_CHANNEL_NAME;
  };
  
  export function getAreaChannelName (areaId) {
    return AREA_CHANNEL_PREFIX + areaId;
  };
  
  export function getTeamChannelName(teamId) {
    return TEAM_CHANNEL_PREFIX + teamId;
  };
}

