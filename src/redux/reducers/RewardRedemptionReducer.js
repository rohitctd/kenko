import * as constants from '../../utils/Constants';

const initialState = {
  isFetching: false,
  rewardRedemptions: [
    {
      bannerImage: '',
      benefit: '',
      categoryId: '',
      detail: '',
      endDate: '',
      endTime: '',
      instruction: '',
      logoImage: '',
      rewardName: '',
      startDate: '',
      startTime: '',
      termsAndConditions: '',
      rewardId: '',
      skuId: '',
      vendorId: '',
      status: false,
      qty: '',
      trackUnit: '',
      markedPrice: '',
      contactedPrice: '',
      tagline: '',
      rewardRedemptions: [
        {
          cash: '0',
          points: '0',
          redemptionOptionId: '',
        },
      ],
    },
  ],
  error: false,
};

export default function updateNotificationSetting(
  state = initialState,
  action
) {
  switch (action.type) {
    case constants.GETTING_REWARD_REDEMPTIONS:
      return {
        ...state,
        isFetching: true,
      };

    case constants.GOT_REDEMPTION_SUCCESS:
      return {
        isFetching: false,
        rewardRedemptions: action.payload,
        error: false,
      };

    case constants.GOT_REDEMPTION_FAILURE:
      return {
        isFetching: false,
        rewardRedemptions: [],
        error: true,
      };

    default:
      return state;
  }
}
