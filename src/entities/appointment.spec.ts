import {expect , test} from 'vitest';
import { Appointment } from './appointment';
import { getFutureDate} from '../tests/utils/get-future-date';

test('create an appointment', () => {
    const startsAt = getFutureDate('2023-01-15');
    const endsAt = getFutureDate('2023-01-16');

    const appointment = new Appointment({
        customer: "John Doe",
        startsAt,
        endsAt
    });

    expect(appointment).toBeInstanceOf(Appointment);
    expect(appointment.customer).toEqual("John Doe");
});


test('cannot create an appointment with end date before start date', () => {
    const startsAt = getFutureDate('2023-01-15');
    const endsAt = getFutureDate('2023-01-14');

    expect(() => {
        return new Appointment({
            customer: "John Doe",
            startsAt,
            endsAt
        })
    }).toThrow();
});