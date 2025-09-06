    hitesh@$220


    





     {/* Reserve Modal */}
        {/* {showReserveModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <h3 className="text-xl font-semibold mb-4">Reserve Property</h3>
              <form onSubmit={handleReserve} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Check-in
                    </label>
                    <input
                      type="date"
                      value={reservation.checkIn}
                      onChange={(e) =>
                        setReservation({
                          ...reservation,
                          checkIn: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Check-out
                    </label>
                    <input
                      type="date"
                      value={reservation.checkOut}
                      onChange={(e) =>
                        setReservation({
                          ...reservation,
                          checkOut: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Number of Guests
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={reservation.guests}
                    onChange={(e) =>
                      setReservation({
                        ...reservation,
                        guests: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700"
                  >
                    Reserve Now
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowReserveModal(false)}
                    className="flex-1 py-2 text-neutral-600 hover:text-neutral-800"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )} */}