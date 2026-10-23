package site.harisarshad.lifvia;

import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        getWindow().getDecorView().setBackgroundColor(Color.parseColor("#090D16"));

        View contentView = findViewById(android.R.id.content);
        if (contentView != null) {
            contentView.setBackgroundColor(Color.parseColor("#090D16"));
            ViewCompat.setOnApplyWindowInsetsListener(contentView, (v, windowInsets) -> {
                Insets bars = windowInsets.getInsets(
                    WindowInsetsCompat.Type.systemBars()
                    | WindowInsetsCompat.Type.displayCutout()
                );
                boolean imeVisible = windowInsets.isVisible(WindowInsetsCompat.Type.ime());
                int bottomPad = imeVisible ? 0 : bars.bottom;
                v.setPadding(bars.left, bars.top, bars.right, bottomPad);
                return windowInsets;
            });
            ViewCompat.requestApplyInsets(contentView);
        }
    }
}
