import Accession from './accession';
import * as CONSTANTS from '../constants';

describe('Accession data model', () => {
  let input;
  const SOME_ID = 'some-id';
  const SOME_ORGANISM = 'some-organism';

  beforeEach(() => {
    input = {
      _source: {
        Accession: SOME_ID,
        organism: SOME_ORGANISM,
      },
    };
  });

  it('provides the organism when set', () => {
    const accession = Accession.create(input);
    expect(accession.getOrganism()).toEqual(SOME_ORGANISM);
  });

  it('provides an empty string when the organism is not set', () => {
    delete input._source.organism;
    const accession = Accession.create(input);
    expect(accession.getOrganism()).toEqual('');
  });

  it('provides the accession ID when set', () => {
    const accession = Accession.create(input);
    expect(accession.getId()).toEqual(SOME_ID);
  });

  it('provides an empty string when the accession ID is not set', () => {
    delete input._source.Accession;
    const accession = Accession.create(input);
    expect(accession.getId()).toEqual('');
  });

  it('provides the URL when the "Authoritative Source URL" is set', () => {
    const SOME_URL = 'some-url';
    input._source['Authoritative Source URL'] = SOME_URL;
    const accession = Accession.create(input);
    expect(accession.getUrl().endsWith(SOME_URL)).toBe(true);
  });

  it('provides the URL when the "Project Link" is set but the "Authoritative Source URL" is not set', () => {
    const SOME_URL = 'some-url';
    input._source['Project Link'] = SOME_URL;
    const accession = Accession.create(input);
    expect(accession.getUrl()).toEqual(SOME_URL);
  });

  it('provides the Authoritative State URL when that value is set and the "Project Link" is also set', () => {
    const SOME_URL_PROJECT = 'some-url-project';
    const SOME_URL_AUTHORITATIVE = 'some-url-authoritative';
    input._source['Project Link'] = SOME_URL_PROJECT;
    input._source['Authoritative Source URL'] = SOME_URL_AUTHORITATIVE;
    const accession = Accession.create(input);
    expect(accession.getUrl().endsWith(SOME_URL_AUTHORITATIVE)).toBe(true);
  });

  it('provides an empty string when no URL is set', () => {
    const accession = Accession.create(input);
    expect(accession.getUrl()).toEqual('');
  });

});
