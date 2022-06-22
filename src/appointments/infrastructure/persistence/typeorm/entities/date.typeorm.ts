import { Column } from 'typeorm';

export class DateTypeOrm {
  @Column('date', { name: 'date', nullable: false })
  public date: string;

  private constructor(
    date: string
  ) {
    this.date = date;
  }

  public static from(date: string) {
    return new DateTypeOrm(date);
  }
  public static of(
    year: number,
    month: number,
    day: number
  ) {
    let  date = `${year}/${month}/${day}`;
    return new DateTypeOrm(date);
  }
}