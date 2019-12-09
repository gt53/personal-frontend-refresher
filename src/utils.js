/**
 * Determine if a query should be made based on the query
 * being populated and different from the previous value.
 *
 * @param  {Object}  params                   - Call params
 * @prop   {String}  params.stateQuery        - The previous query made, if any
 * @prop   {String}  params.newQuery          - The value for this requested query
 * @prop   {Boolean} [params.queryInProgress] - Flag indicating that a query is already in progress. Defaults to false
 * @return {Boolean}                          - True if a query should be made; false otherwise
 */
export function shouldMakeQuery({stateQuery, newQuery, queryInProgress = false}) {
  if (!newQuery || newQuery === stateQuery) {
    return false;
  }
  if (queryInProgress) {
    return false;
  }

  return true;
}
