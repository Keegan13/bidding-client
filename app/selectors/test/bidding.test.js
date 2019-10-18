import {
  selectBidding,
  makeSelectError,
  makeSelectAssignments,
  makeSelectBet,
  makeSelectSelectedAssignment,
  makeSelectAssignment,
  makeSelectCutters,
  makeSelectNotifications
} from '../bidding';

describe('selectBidding', () => {
  it('should select the bidding section', () => {
    const biddingSection = {};
    const mockedState = {
      bidding: biddingSection,
    };
    expect(selectBidding(mockedState)).toEqual(biddingSection);
  });
});

describe('makeSelectAssignments', () => {
  const currentUserSelector = makeSelectAssignments();
  it('should select the assignments array', () => {
    const assignments = [];
    const mockedState = {
      bidding: {
        assignments
      },
    };
    expect(currentUserSelector(mockedState)).toEqual(username);
  });
});

describe('makeSelectLoading', () => {
  const loadingSelector = makeSelectLoading();
  it('should select the loading', () => {
    const loading = false;
    const mockedState = {
      global: {
        loading,
      },
    };
    expect(loadingSelector(mockedState)).toEqual(loading);
  });
});

describe('makeSelectError', () => {
  const errorSelector = makeSelectError();
  it('should select the error', () => {
    const error = 404;
    const mockedState = {
      global: {
        error,
      },
    };
    expect(errorSelector(mockedState)).toEqual(error);
  });
});

describe('makeSelectRepos', () => {
  const reposSelector = makeSelectRepos();
  it('should select the repos', () => {
    const repositories = [];
    const mockedState = {
      global: {
        userData: {
          repositories,
        },
      },
    };
    expect(reposSelector(mockedState)).toEqual(repositories);
  });
});

describe('makeSelectLocation', () => {
  const locationStateSelector = makeSelectLocation();
  it('should select the location', () => {
    const router = {
      location: { pathname: '/foo' },
    };
    const mockedState = {
      router,
    };
    expect(locationStateSelector(mockedState)).toEqual(router.location);
  });
});
