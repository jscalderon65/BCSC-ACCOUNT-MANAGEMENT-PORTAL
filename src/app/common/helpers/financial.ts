export const formatToCOP = (amount: number): string => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(amount);
};

export const formatTransactionDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export function getMonthDetails() {
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const currentMonthIndex = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const currentMonthDate = new Date(currentYear, currentMonthIndex, 1);
  const previousMonthDate = new Date(
    currentYear,
    (currentMonthIndex - 1 + 12) % 12,
    1,
  );
  const nextMonthDate = new Date(currentYear, (currentMonthIndex + 1) % 12, 1);

  return {
    currentMonth: {
      name: months[currentMonthIndex],
      date: currentMonthDate,
    },
    previousMonth: {
      name: months[(currentMonthIndex - 1 + 12) % 12],
      date: previousMonthDate,
    },
    nextMonth: {
      name: months[(currentMonthIndex + 1) % 12],
      date: nextMonthDate,
    },
  };
}
